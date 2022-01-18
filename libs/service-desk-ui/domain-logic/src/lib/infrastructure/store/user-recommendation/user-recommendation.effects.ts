import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, tap, filter } from 'rxjs/operators';

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

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.select),
      map((action) => UserRecommendationActions.loadSelected({ edit: action.edit }))
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.loadSelected),
      withLatestFrom(this.store.select(UserRecommendationSelectors.getSelectedId)),
      switchMap(([action, selectedId]) =>
        this.userRecommendationApi.show(selectedId).pipe(
          map((recommendation) => UserRecommendationActions.loadSelectedSuccess({ recommendation, edit: action.edit })),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить запись.');

            return of(UserRecommendationActions.loadSelectedFailure({ error }));
          })
        )
      )
    )
  );

  loadSelectedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.loadSelectedSuccess),
      filter((action) => Boolean(action.edit)),
      withLatestFrom(this.store.select(UserRecommendationSelectors.getSelected)),
      map(([_action, userRecommendation]) => UserRecommendationActions.initForm({ recommendation: userRecommendation }))
    )
  );

  destroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.destroy),
      fetch({
        run: (action) =>
          this.userRecommendationApi
            .destroy(action.id)
            .pipe(map(() => UserRecommendationActions.destroySuccess({ id: action.id }))),
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось удалить запись.');

          return of(UserRecommendationActions.destroyFailure({ error }));
        },
      })
    )
  );

  // destroySuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserRecommendationActions.destroySuccess),
  //     map(() => UserRecommendationActions.loadAll())
  //   )
  // );

  // ========== Форма рекомендаций для пользователя ==========

  saveForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.saveForm),
      withLatestFrom(this.store.select(UserRecommendationSelectors.getFormData)),
      switchMap(([_action, formData]) => {
        const serverForm = UserRecommendationFactory.createServerForm(formData);

        if (formData.id) {
          return this.userRecommendationApi
            .update(serverForm.id, serverForm)
            .pipe(tap(() => this.notificationFacade.showMessage('Запись обновлена')));
        } else {
          return this.userRecommendationApi
            .save(serverForm)
            .pipe(tap(() => this.notificationFacade.showMessage('Запись создана')));
        }
      }),
      map((recommendation) => UserRecommendationActions.saveFormSuccess({ recommendation })),
      catchError((error) => {
        this.errorHandlerService.handleError(error, 'Не удалось сохранить запись.');

        return of(UserRecommendationActions.saveFormFailure({ error }));
      })
    )
  );

  saveFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.saveFormSuccess),
      map(() => UserRecommendationActions.closeForm())
    )
  );
}
