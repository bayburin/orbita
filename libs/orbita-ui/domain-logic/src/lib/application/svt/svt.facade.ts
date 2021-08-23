import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, tap, withLatestFrom, switchMap, catchError, startWith, share } from 'rxjs/operators';
import { muteFirst } from '@orbita/orbita-ui/utils';

import * as SvtItemFeature from '../../infrastructure/store/svt-item/svt-item.reducer';
import * as SvtItemActions from '../../infrastructure/store/svt-item/svt-item.actions';
import * as SvtItemSelectors from '../../infrastructure/store/svt-item/svt-item.selectors';
import { SvtFacadeAbstract } from './svt.facade.abstract';
import { SvtApi } from './../../infrastructure/api/svt/svt.api';
import { SvtFilters } from './../../entities/filter.interface';

/**
 * Фасад для работы с данными из СВТ (обращения к хранилищу SvtItem)
 */
@Injectable({
  providedIn: 'root',
})
export class SvtFacade implements SvtFacadeAbstract {
  loadingItem$ = this.store.select(SvtItemSelectors.getLoading);
  loadedItem$ = this.store.select(SvtItemSelectors.getLoaded);
  allItems$ = this.store.select(SvtItemSelectors.getAll);
  selectedItem$ = this.store.select(SvtItemSelectors.getSelected);
  loadForFormItems$ = this.store.select(SvtItemSelectors.getNeedFormItems).pipe(
    filter((needItems) => needItems),
    tap(() => this.store.dispatch(SvtItemActions.loadAllForForm())),
    withLatestFrom(this.store.select(SvtItemSelectors.getFormFilters)),
    switchMap(([_need, filters]) =>
      this.svtApi.queryItems(filters).pipe(
        tap((svtItems) => this.store.dispatch(SvtItemActions.loadAllForFormSuccess({ svtItems }))),
        catchError((error) => of(this.store.dispatch(SvtItemActions.loadAllForFormFailure({ error }))))
      )
    ),
    share()
  );
  allForFormItems$ = muteFirst(
    this.loadForFormItems$.pipe(startWith(null)),
    this.store.select(SvtItemSelectors.getAll)
  );

  constructor(private store: Store<SvtItemFeature.SvtItemPartialState>, private svtApi: SvtApi) {}

  loadItemsForForm(filters: SvtFilters) {
    this.store.dispatch(SvtItemActions.setFormFilters({ filters }));
  }

  removeAllItems() {
    this.store.dispatch(SvtItemActions.clearAll());
  }
}
