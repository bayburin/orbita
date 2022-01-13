import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetch } from '@nrwl/angular';

import { UserApi } from '../../api/user/user.api';
import { getLimitTypesValue } from '../../../entities/models/limit-types-value-model.enum';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as NotificationActions from './notification.actions';
import * as NotificationFeature from './notification.reducer';
import * as NotificationSelectors from './notification.selectors';

@Injectable()
export class NotificationEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<NotificationFeature.NotificationPartialState>,
    private userApi: UserApi,
    private errorHandlerService: ErrorHandlerService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.loadAll),
      withLatestFrom(this.store.select(NotificationSelectors.getLimitType)),
      switchMap(([_action, limit]) =>
        this.userApi.loadNotifications(getLimitTypesValue(limit)).pipe(
          switchMap((notifications) => [
            NotificationActions.loadAllSuccess({ notifications }),
            NotificationActions.clearUnreadNotificationCount(),
          ]),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить список уведомлений.');

            return of(NotificationActions.loadAllFailure({ error }));
          })
        )
      )
    )
  );

  loadNew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.loadNew),
      withLatestFrom(this.store.select(NotificationSelectors.getLimitType)),
      switchMap(([_action, limit]) =>
        this.userApi.loadNewNotifications(getLimitTypesValue(limit)).pipe(
          switchMap((notifications) => [
            NotificationActions.loadNewSuccess({ notifications }),
            NotificationActions.clearUnreadNotificationCount(),
          ]),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить новые уведомления.');

            return of(NotificationActions.loadNewFailure({ error }));
          })
        )
      )
    )
  );

  toggleLimitType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.toggleLimitType),
      map(() => NotificationActions.loadAll())
    )
  );
}
