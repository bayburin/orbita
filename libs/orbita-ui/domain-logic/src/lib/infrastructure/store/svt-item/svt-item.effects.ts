import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, filter } from 'rxjs/operators';
import { isNumber } from '@orbita/orbita-ui/utils';

import { SvtApi } from './../../api/svt/svt.api';
import { SvtItemCacheService } from './../../services/svt-item-cache.service';
import { convertPrimeFilter } from './../../utils/convert-prime-filter.function';
import * as SvtItemFeature from './svt-item.reducer';
import * as SvtItemActions from './svt-item.actions';
import * as SvtItemSelectors from './svt-item.selectors';
import * as SvtTypeActions from '../svt-type/svt-type.actions';
import * as SvtWorkplaceCount from '../svt-workplace-count/svt-workplace-count.actions';
import * as SvtWorkplaceType from '../svt-workplace-type/svt-workplace-type.actions';
import * as SvtWorkplace from '../svt-workplace/svt-workplace.actions';

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
          switchMap((items) => {
            const normalizeData = SvtItemCacheService.normalizeSvtItems(items).entities;

            return [
              SvtItemActions.setPartials({ entities: normalizeData }),
              SvtItemActions.loadAllSuccess({ svtItems: Object.values(normalizeData.items || []) }),
            ];
          }),
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
          switchMap((items) => {
            const normalizeData = SvtItemCacheService.normalizeSvtItems(items).entities;

            return [
              SvtItemActions.setPartials({ entities: normalizeData }),
              SvtItemActions.loadAllForFormSuccess({ svtItems: Object.values(normalizeData.items || []) }),
            ];
          }),
          catchError((error) => of(SvtItemActions.loadAllForFormFailure({ error })))
        )
      )
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadSelected),
      withLatestFrom(this.store.select(SvtItemSelectors.getSelectedId)),
      switchMap(([_action, barcode]) =>
        this.svtApi.showItem(barcode).pipe(
          switchMap((svtItem) => {
            if (svtItem.item_id) {
              const normalizeData = SvtItemCacheService.normalizeSvtItem(svtItem).entities;

              return [
                SvtItemActions.setPartials({ entities: normalizeData }),
                SvtItemActions.loadSelectedSuccess({ svtItem: normalizeData.items[svtItem.item_id] }),
              ];
            } else {
              return [SvtItemActions.loadSelectedNotFound()];
            }
          }),
          catchError((error) => of(SvtItemActions.loadSelectedFailure({ error })))
        )
      )
    )
  );

  setPartials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.setPartials),
      switchMap((action) => [
        SvtTypeActions.setAll({ svtTypes: Object.values(action.entities.types || []) }),
        SvtWorkplaceCount.setAll({ wpCounts: Object.values(action.entities.workplace_counts || []) }),
        SvtWorkplaceType.setAll({ wpTypes: Object.values(action.entities.workplace_types || []) }),
        SvtWorkplace.setAll({ workplaces: Object.values(action.entities.workplaces || []) }),
      ])
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
