import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as SdRequestActions from './sd-request.actions';
import * as fromSdRequest from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';
import { SdRequestApi } from './../../api/sd-request/sd-request.api';

@Injectable()
export class SdRequestEffects {
  constructor(
    private actions$: Actions,
    private sdRequestApi: SdRequestApi,
    private store: Store<fromSdRequest.SdRequestPartialState>
  ) { }

  // loadAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SdRequestActions.SetPage),
  //     tap(() => this.store.dispatch(SdRequestActions.loadAll())),
  //     withLatestFrom(this.store.select(SdRequestSelectors.getMaxSize)),
  //     switchMap(([action, maxSize]) => this.sdRequestApi.query(action.page, maxSize)
  //       .pipe(
  //         map(sdRequestQueue => SdRequestActions.loadAllSuccess({ sdRequestQueue })),
  //         catchError(error => of(SdRequestActions.loadAllFailure({ error })))
  //       )
  //     )
  //   )
  // );
}
