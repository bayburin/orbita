import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import * as ParameterFeature from './parameter.reducer';
import * as ParameterActions from './parameter.actions';
import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import { ParameterApi } from './../../api/parameter/parameter.api';

@Injectable()
export class ParameterEffects {
  constructor(
    private actions$: Actions,
    private parameterApi: ParameterApi,
    private store: Store<ParameterFeature.ParameterPartialState>
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ParameterActions.loadAll),
      withLatestFrom(this.store.select(SdRequestSelectors.getSelected)),
      switchMap(([_action, sdRequest]) =>
        this.parameterApi.query(sdRequest.id).pipe(
          map((data) => ParameterActions.loadAllSuccess({ parameters: data.parameters })),
          catchError((error) => of(ParameterActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
