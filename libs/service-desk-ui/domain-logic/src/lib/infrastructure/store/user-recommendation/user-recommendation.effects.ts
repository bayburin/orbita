import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, tap, filter } from 'rxjs/operators';

import { AdminUserRecommendationApi } from './../../api/admin/admin-user-recommendation/admin-user-recommendation.api';
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
    private adminUserRecommendationApi: AdminUserRecommendationApi,
    private notificationFacade: NotificationFacade,
    private errorHandlerService: ErrorHandlerService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.loadAll),
      fetch({
        run: () => {
          return this.adminUserRecommendationApi
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
        this.adminUserRecommendationApi.show(selectedId).pipe(
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
          this.adminUserRecommendationApi
            .destroy(action.id)
            .pipe(map(() => UserRecommendationActions.destroySuccess({ id: action.id }))),
        onError: (action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось удалить запись.');

          return of(UserRecommendationActions.destroyFailure({ id: action.id }));
        },
      })
    )
  );

  reorder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.reorder),
      withLatestFrom(this.store.select(UserRecommendationSelectors.getAll)),
      map(([action, userRecommendations]) => {
        const minIndex = Math.min(action.oldIndex, action.newIndex);
        const data = userRecommendations
          .slice(minIndex)
          .map((rec, index) => ({ id: rec.id, order: (minIndex + index) * 10 }));

        return UserRecommendationActions.reorderStart({ data });
      })
    )
  );

  reorderStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.reorderStart),
      fetch({
        run: (action) => {
          return this.adminUserRecommendationApi
            .reorder(action.data)
            .pipe(map((recommendations) => UserRecommendationActions.reorderSuccess({ recommendations })));
        },
        onError: (action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось сохранить новый порядок.');

          return of(UserRecommendationActions.reorderFailure({ ids: action.data.map((el) => el.id) }));
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

        if (serverForm.id) {
          return this.adminUserRecommendationApi.update(serverForm.id, serverForm).pipe(
            tap(() => this.notificationFacade.showMessage('Запись обновлена')),
            map((recommendation) => UserRecommendationActions.saveFormSuccess({ recommendation })),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось обновить запись.');

              return of(UserRecommendationActions.saveFormFailure({ error }));
            })
          );
        } else {
          return this.adminUserRecommendationApi.save(serverForm).pipe(
            tap(() => this.notificationFacade.showMessage('Запись создана')),
            map((recommendation) => UserRecommendationActions.saveFormSuccess({ recommendation })),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось сохранить запись.');

              return of(UserRecommendationActions.saveFormFailure({ error }));
            })
          );
        }
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
