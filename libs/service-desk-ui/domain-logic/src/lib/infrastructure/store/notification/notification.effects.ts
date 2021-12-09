import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserApi } from '../../api/user/user.api';
import * as NotificationActions from './notification.actions';
import * as NotificationFeature from './notification.reducer';
import * as NotificationSelectors from './notification.selectors';

@Injectable()
export class NotificationEffects {
  constructor(
    private readonly actions$: Actions,
    private userApi: UserApi,
    private store: Store<NotificationFeature.NotificationPartialState>
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.loadAll),
      withLatestFrom(this.store.select(NotificationSelectors.getVisibleLimit)),
      switchMap(([_action, limit]) =>
        this.userApi.loadNotifications(limit).pipe(
          map((notifications) => NotificationActions.loadAllSuccess({ notifications })),
          catchError((error) => of(NotificationActions.loadAllFailure({ error })))
        )
      )
    )
  );

  toggleVisibleLimit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.toggleVisibleLimit),
      map(() => NotificationActions.loadAll())
    )
  );
}
