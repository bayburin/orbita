import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';

import { ServiceApi } from '../../api/service/service.api';
import * as ServiceActions from './service.actions';
import * as ServiceFeature from './service.reducer';
import * as RouterSelectors from '../selectors/router.selectors';

@Injectable()
export class ServiceEffects {
  constructor(
    private readonly actions$: Actions,
    private serviceApi: ServiceApi,
    private store: Store<ServiceFeature.ServicePartialState>
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, routeParams]) =>
        this.serviceApi.show(routeParams.id).pipe(
          map((service) => ServiceActions.loadSelectedSuccess({ service })),
          catchError((error) => of(ServiceActions.loadSelectedFailure({ error })))
        )
      )
    )
  );
}
