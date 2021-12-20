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
      map(() => KaseActions.loadAll())
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.loadAll),
      withLatestFrom(
        this.store.select(KaseSelectors.getServiceIds),
        this.store.select(KaseSelectors.getSelectedStatusId)
      ),
      switchMap(([_action, serviceIds, selectedStatusId]) =>
        this.kaseApi.query({ limit: 15, offset: 0, status_id: selectedStatusId, service_ids: serviceIds }).pipe(
          switchMap((result) => {
            const statuses = result.statuses.map((status) => ({
              ...status,
              id: status.id === null ? status.id : +status.id,
              count: +status.count,
            }));

            return [KaseActions.setStatuses({ statuses }), KaseActions.loadAllSuccess({ kases: result.apps })];
          }),
          catchError((error) => of(KaseActions.loadAllFailure({ error })))
        )
      )
    )
  );

  revoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.revoke),
      fetch({
        run: (action) => this.kaseApi.revoke(action.caseId).pipe(map(() => KaseActions.revokeSuccess())),
        onError: (action, error) => {
          console.error('Error', error);
          return KaseActions.revokeFailure({ error });
        },
      })
    )
  );

  vote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.vote),
      withLatestFrom(this.store.select(KaseSelectors.getEntities)),
      switchMap(([action, entities]) => {
        const payload = {
          ...entities[action.caseId],
          rating: action.rating,
        };

        return this.kaseApi.update(action.caseId, payload).pipe(
          map(() => KaseActions.voteSuccess()),
          catchError((error) => of(KaseActions.voteFailure({ error })))
        );
      })
    )
  );

  revokeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.revokeSuccess, KaseActions.voteSuccess),
      map(() => KaseActions.loadAll())
    )
  );

  setSelectedStatusId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.setSelectedStatusId),
      map(() => KaseActions.loadAll())
    )
  );
}
