import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import * as AppActions from './app.actions';
import { AppApi } from './../../api/app/app.api';
import * as UserActions from '../user/user.actions';
import * as GroupActions from '../group/group.actions';
import * as EventTypeActions from '../event-type/event-type.actions';
import * as ApplicationActions from '../application/application.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appApi: AppApi) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.init),
      switchMap(() =>
        this.appApi.init().pipe(
          switchMap((initData) => [
            AppActions.loadAppSuccess(),
            UserActions.setAll({ users: initData.init.users }),
            GroupActions.setAll({ groups: initData.init.groups }),
            EventTypeActions.setAll({ eventTypes: initData.init.event_types }),
            ApplicationActions.setAll({ applications: initData.init.applications }),
          ]),
          catchError((error) => of(AppActions.loadAppFailure(error.error)))
        )
      )
    )
  );
}
