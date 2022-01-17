import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, tap } from 'rxjs/operators';

import { UserRecommendationApi } from './../../api/user-recommendation/user-recommendation.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { NotificationFacade } from '../../../application/notification/notification.facade';
import { UserRecommendationFactory } from './../../factories/user-recommendation.factory';
import * as UserRecommendationActions from './user-recommendation.actions';
import * as UserRecommendationFeature from './user-recommendation.reducer';
import * as UserRecommendationSelectors from './user-recommendation.selectors';

@Injectable()
export class UserRecommendationEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<UserRecommendationFeature.State>,
    private userRecommendationApi: UserRecommendationApi,
    private notificationFacade: NotificationFacade,
    private errorHandlerService: ErrorHandlerService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.loadAll),
      fetch({
        run: () => {
          return this.userRecommendationApi
            .query()
            .pipe(map((recommendations) => UserRecommendationActions.loadAllSuccess({ recommendations })));
        },
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось загрузить список рекомендаций для пользователя');

          return UserRecommendationActions.loadAllFailure({ error });
        },
      })
    )
  );

  // ========== Форма рекомендаций для пользователя ==========

  saveForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.saveForm),
      withLatestFrom(this.store.select(UserRecommendationSelectors.getFormData)),
      switchMap(([_action, formData]) => {
        const serverForm = UserRecommendationFactory.createServerForm(formData);

        return this.userRecommendationApi.save(serverForm).pipe(
          tap(() => this.notificationFacade.showMessage('Запись создана')),
          map(() => UserRecommendationActions.saveFormSuccess()),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось создать запись.');

            return of(UserRecommendationActions.saveFormFailure({ error }));
          })
        );
      })
    )
  );

  saveFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.saveFormSuccess),
      switchMap(() => [UserRecommendationActions.closeForm(), UserRecommendationActions.loadAll()])
    )
  );
}
