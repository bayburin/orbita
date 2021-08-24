import { convertPrimeFilter } from './../../utils/convert-prime-filter.function';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, filter } from 'rxjs/operators';
import { isNumber } from '@orbita/orbita-ui/utils';

import { SvtApi } from './../../api/svt/svt.api';
import * as SvtItemFeature from './svt-item.reducer';
import * as SvtItemActions from './svt-item.actions';
import * as SvtItemSelectors from './svt-item.selectors';
import * as SdRequestActions from '../sd-request/sd-request.actions';

@Injectable()
export class SvtItemEffects {
  constructor(
    private actions$: Actions,
    private svtApi: SvtApi,
    private store: Store<SvtItemFeature.SvtItemPartialState>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadAll),
      switchMap((action) =>
        this.svtApi.queryItems(convertPrimeFilter(action.filters)).pipe(
          map((items) => SvtItemActions.loadAllSuccess({ svtItems: items })),
          catchError((error) => of(SvtItemActions.loadAllFailure({ error })))
        )
      )
    )
  );

  loadAllForForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadAllForForm),
      switchMap((action) =>
        this.svtApi.queryItems(action.filters).pipe(
          map((items) => SvtItemActions.loadAllForFormSuccess({ svtItems: items })),
          catchError((error) => of(SvtItemActions.loadAllForFormFailure({ error })))
        )
      )
    )
  );

  loadAllForFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadAllForFormSuccess),
      map((action) => SdRequestActions.setSvtItemToNewForm({ svtItem: action.svtItems[0] }))
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadSelected),
      withLatestFrom(this.store.select(SvtItemSelectors.getSelectedId)),
      switchMap(([_action, barcode]) =>
        this.svtApi.showItem(barcode).pipe(
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
