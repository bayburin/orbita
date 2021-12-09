import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { UserApi } from '../../api/user/user.api';
import * as NotificationActions from './notification.actions';
import * as NotificationFeature from './notification.reducer';

@Injectable()
export class NotificationEffects {
  constructor(private readonly actions$: Actions, private userApi: UserApi) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.loadAll),
      fetch({
        run: (action) => {
          return this.userApi
            .loadNotifications()
            .pipe(map((notifications) => NotificationActions.loadAllSuccess({ notifications })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return NotificationActions.loadAllFailure({ error });
        },
      })
    )
  );
}
