import { convertPrimeFilter } from './../../utils/convert-prime-filter.function';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, filter, tap } from 'rxjs/operators';
import { isNumber } from '@orbita/orbita-ui/utils';

import { SvtApi } from './../../api/svt/svt.api';
import * as SvtItemFeature from './svt-item.reducer';
import * as SvtItemActions from './svt-item.actions';
import * as SvtItemSelectors from './svt-item.selectors';

@Injectable()
export class SvtItemEffects {
  constructor(
    private actions$: Actions,
    private svtItemApi: SvtApi,
    private store: Store<SvtItemFeature.SvtItemPartialState>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadAll),
      switchMap((action) =>
        this.svtItemApi.queryItems(convertPrimeFilter(action.filters)).pipe(
          map((items) => SvtItemActions.loadAllSuccess({ svtItems: items })),
          catchError((error) => of(SvtItemActions.loadAllFailure({ error })))
        )
      )
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadSelected),
      withLatestFrom(this.store.select(SvtItemSelectors.getSelectedId)),
      switchMap(([_action, barcode]) =>
        this.svtItemApi.showItem(barcode).pipe(
          map((svtItem) =>
            svtItem.item_id ? SvtItemActions.loadSelectedSuccess({ svtItem }) : SvtItemActions.loadSelectedNotFound()
          ),
          catchError((error) => of(SvtItemActions.loadSelectedFailure({ error })))
        )
      )
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.select),
      filter((action) => isNumber(action.barcode)),
      map(SvtItemActions.loadSelected)
    )
  );
}
