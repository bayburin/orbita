import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, tap, withLatestFrom, switchMap, catchError, startWith } from 'rxjs/operators';
import { muteFirst } from '@orbita/orbita-ui/utils';

import * as SvtItemFeature from '../../infrastructure/store/svt-item/svt-item.reducer';
import * as SvtItemActions from '../../infrastructure/store/svt-item/svt-item.actions';
import * as SvtItemSelectors from '../../infrastructure/store/svt-item/svt-item.selectors';
import { SvtFacadeAbstract } from './svt.facade.abstract';
import { SvtApi } from './../../infrastructure/api/svt/svt.api';

/**
 * Фасад для работы с данными из СВТ (обращения к хранилищу SvtItem)
 */
@Injectable({
  providedIn: 'root',
})
export class SvtFacade implements SvtFacadeAbstract {
  loadingItem$ = this.store.select(SvtItemSelectors.getLoading);
  loadedItem$ = this.store.select(SvtItemSelectors.getLoaded);
  selectedItem$ = this.store.select(SvtItemSelectors.getSelected);
  loadItems$ = this.store.select(SvtItemSelectors.getNeedItems).pipe(
    filter((needTickets) => needTickets),
    tap(() => this.store.dispatch(SvtItemActions.loadAll())),
    withLatestFrom(this.store.select(SvtItemSelectors.getFilters)),
    switchMap(([_need, filters]) =>
      this.svtApi.queryItems(filters).pipe(
        tap((svtItems) => this.store.dispatch(SvtItemActions.loadAllSuccess({ svtItems }))),
        catchError((error) => of(this.store.dispatch(SvtItemActions.loadAllFailure({ error }))))
      )
    )
  );
  allItems$ = muteFirst(this.loadItems$.pipe(startWith(null)), this.store.select(SvtItemSelectors.getAll));

  constructor(private store: Store<SvtItemFeature.SvtItemPartialState>, private svtApi: SvtApi) {}
}
