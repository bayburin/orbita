import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';

import * as KaseActions from './kase.actions';
import * as KaseFeature from './kase.reducer';
import * as KaseSelectors from './kase.selectors';
import { KaseApi } from './../../api/kase/kase.api';

@Injectable()
export class KaseEffects {
  constructor(
    private readonly actions$: Actions,
    private kaseApi: KaseApi,
    private store: Store<KaseFeature.KasePartialState>
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.init),
      map(() => KaseActions.loadAll({ statusId: null }))
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.loadAll),
      withLatestFrom(this.store.select(KaseSelectors.getServiceIds)),
      switchMap(([action, serviceIds]) =>
        this.kaseApi.query({ limit: 15, offset: 0, status_id: action.statusId, service_ids: serviceIds }).pipe(
          switchMap((result) => {
            return [
              KaseActions.setStatuses({ statuses: result.statuses }),
              KaseActions.loadAllSuccess({ kases: result.apps }),
            ];
          }),
          catchError((error) => of(KaseActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
