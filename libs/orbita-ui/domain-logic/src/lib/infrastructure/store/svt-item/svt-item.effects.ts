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

@Injectable()
export class SvtItemEffects {
  constructor(
    private actions$: Actions,
    private svtItemApi: SvtApi,
    private store: Store<SvtItemFeature.SvtItemPartialState>
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SvtItemActions.loadSelected),
      withLatestFrom(this.store.select(SvtItemSelectors.getSelectedId)),
      filter(([_action, barcode]) => isNumber(barcode)),
      switchMap(([_action, barcode]) =>
        this.svtItemApi.showItem(barcode).pipe(
          map((svtItem) => SvtItemActions.loadSelectedSuccess({ svtItem })),
          catchError((error) => of(SvtItemActions.loadSelectedFailure({ error })))
        )
      )
    )
  );

  select$ = createEffect(() => this.actions$.pipe(ofType(SvtItemActions.select), map(SvtItemActions.loadSelected)));
}
