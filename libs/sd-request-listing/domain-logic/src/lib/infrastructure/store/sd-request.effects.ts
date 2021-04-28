import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import * as SdRequestActions from './sd-request.actions';
import { SdRequestApi } from './../api/sd-request.api';

@Injectable()
export class SdRequestEffects {
  constructor(
    private actions$: Actions,
    private sdRequestApi: SdRequestApi
  ) { }

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.loadAll),
      mergeMap(() => this.sdRequestApi.getSdRequests()
        .pipe(
          map(sdRequests => SdRequestActions.loadAllSuccess({ sdRequests })),
          catchError(error => of(SdRequestActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
