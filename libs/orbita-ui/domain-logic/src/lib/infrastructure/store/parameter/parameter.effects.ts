import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as ParameterActions from './parameter.actions';
import { ParameterApi } from './../../api/parameter/parameter.api';

@Injectable()
export class ParameterEffects {
  constructor(private actions$: Actions, private parameterApi: ParameterApi) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ParameterActions.loadAll),
      switchMap((action) =>
        this.parameterApi.query(action.claim_id).pipe(
          map((data) =>
            ParameterActions.loadAllSuccess({ parameters: data.parameters })
          ),
          catchError((error) => of(ParameterActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
