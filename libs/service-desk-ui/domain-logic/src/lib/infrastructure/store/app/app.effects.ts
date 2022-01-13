import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { filter, tap, map, switchMap, catchError, withLatestFrom, delay } from 'rxjs/operators';

import { AppApi } from './../../api/app/app.api';
import { NotificationFacade } from './../../../application/notification/notification.facade';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as AppActions from './app.actions';
import * as AppFeature from './app.reducer';
import * as AppSelectors from './app.selectors';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<AppFeature.AppPartialState>,
    private appApi: AppApi,
    private notificationFacade: NotificationFacade,
    private errorHandlerService: ErrorHandlerService
  ) {}

  appInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appInit),
      fetch({
        run: () =>
          this.appApi.init().pipe(
            delay(500),
            map((init) => AppActions.appInitSuccess({ init }))
          ),
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось загрузить начальные данные.');

          return AppActions.appInitFailure({ error });
        },
      })
    )
  );

  detectAdBlock$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.detectAdBlock),
        filter((adBlock) => !!adBlock),
        tap(() => this.notificationFacade.showMessage('Для корректной работы портала отключите, пожалуйста, AdBlock'))
      ),
    { dispatch: false }
  );

  loadNewAppVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadAppVersion),
      withLatestFrom(this.store.select(AppSelectors.getAppHash)),
      switchMap(([_action, oldHash]) => {
        return this.appApi.appVersion().pipe(
          map((version) => {
            console.log('currentHash: ', oldHash);
            console.log('newHash: ', version.hash);

            if (oldHash && oldHash !== '{{POST_BUILD_ENTERS_HASH_HERE}}' && oldHash !== version.hash) {
              this.notificationFacade.showMessage(
                'Внимание! Вы используете устаревшую версию портала Техподдержки. Для корректной работы портала обновите страницу'
              );
            }

            return AppActions.loadAppVersionSuccess({ version });
          }),
          catchError(() => of(AppActions.loadAppVersionFailure()))
        );
      })
    )
  );
}
