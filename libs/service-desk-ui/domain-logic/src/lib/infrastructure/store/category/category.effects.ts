import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { switchMap, withLatestFrom, catchError, map, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { CategoryApi } from './../../api/category/category.api';
import { CategoryCacheService } from './../../services/category-cache.service';
import { AdminCategoryApi } from './../../api/admin/admin-category/admin-category.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { NotificationFacade } from './../../../application/notification/notification.facade';
import * as CategoryActions from './category.actions';
import * as CategoryFeature from './category.reducer';
import * as CategorySelectors from './category.selectors';
import * as ServiceActions from '../service/service.actions';
import * as QuestionActions from '../question/question.actions';
import * as AnswerActions from '../answer/answer.actions';
import * as RouterSelectors from '../selectors/router.selectors';
import * as KaseActions from '../kase/kase.actions';
import * as ResponsibleUserActions from '../responsible-user/responsible-user.actions';
import * as AttachmentActions from '../attachment/attachment.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<CategoryFeature.CategoryPartialState>,
    private categoryApi: CategoryApi,
    private adminCategoryApi: AdminCategoryApi,
    private errorHandlerService: ErrorHandlerService,
    private notificationFacade: NotificationFacade
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadAll),
      fetch({
        run: (_action) => {
          return this.categoryApi.query().pipe(
            switchMap((categories) => {
              const data = CategoryCacheService.normalizeCategories(categories);

              return [
                ServiceActions.setEntities({ entities: data.entities.services }),
                CategoryActions.loadAllSuccess({ entities: data.entities.categories, ids: data.result as number[] }),
              ];
            })
          );
        },
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось загрузить список услуг.');

          return CategoryActions.loadAllFailure({ error });
        },
      })
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, params]) =>
        this.categoryApi.show(params.id).pipe(
          switchMap((category) => {
            const data = CategoryCacheService.normalizeCategories(category).entities;

            return [
              AttachmentActions.setEntities({ entities: data.attachments || {} }),
              AnswerActions.setEntities({ entities: data.answers || {} }),
              QuestionActions.setEntities({ entities: data.questions || {} }),
              ResponsibleUserActions.setEntities({ entities: data.responsible_users || {} }),
              ServiceActions.setEntities({ entities: data.services || {} }),
              KaseActions.setServiceIds({ serviceIds: Object.keys(data.services || []).map(Number) }),
              CategoryActions.loadSelectedSuccess({ category: data.categories[params.id] }),
            ];
          }),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить данные по услугам.');

            return of(CategoryActions.loadSelectedFailure({ error }));
          })
        )
      )
    )
  );

  // ========== Администрирование ==========

  adminLoadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminLoadAll),
      fetch({
        run: (_action) => {
          return this.adminCategoryApi
            .query()
            .pipe(map((categories) => CategoryActions.adminLoadAllSuccess({ categories })));
        },
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось загрузить список категорий.');

          return CategoryActions.adminLoadAllFailure({ error });
        },
      })
    )
  );

  adminSelect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminSelect),
      map((action) => CategoryActions.adminLoadSelected({ edit: action.edit }))
    )
  );

  adminLoadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminLoadSelected),
      withLatestFrom(this.store.select(CategorySelectors.getSelectedId)),
      switchMap(([action, selectedId]) =>
        this.adminCategoryApi.show(selectedId).pipe(
          map((category) => CategoryActions.adminLoadSelectedSuccess({ category, edit: action.edit })),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить категорию.');

            return of(CategoryActions.adminLoadSelectedFailure({ error }));
          })
        )
      )
    )
  );

  adminLoadSelectedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminLoadSelectedSuccess),
      filter((action) => Boolean(action.edit)),
      withLatestFrom(this.store.select(CategorySelectors.getSelected)),
      map(([_action, userRecommendation]) => CategoryActions.adminInitForm({ category: userRecommendation }))
    )
  );

  adminSaveForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminSaveForm),
      withLatestFrom(this.store.select(CategorySelectors.getFormData)),
      switchMap(([_action, formData]) => {
        if (formData.id) {
          return this.adminCategoryApi.update(formData.id, formData).pipe(
            tap(() => this.notificationFacade.showMessage('Категория обновлена')),
            map((category) => CategoryActions.adminSaveFormSuccess({ category })),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось обновить категорию.');

              return of(CategoryActions.adminSaveFormFailure({ error }));
            })
          );
        } else {
          return this.adminCategoryApi.save(formData).pipe(
            tap(() => this.notificationFacade.showMessage('Категория создана')),
            map((category) => CategoryActions.adminSaveFormSuccess({ category })),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось сохранить категорию.');

              return of(CategoryActions.adminSaveFormFailure({ error }));
            })
          );
        }
      })
    )
  );

  adminSaveFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminSaveFormSuccess),
      map(() => CategoryActions.adminCloseForm())
    )
  );

  adminDestroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.adminDestroy),
      fetch({
        run: (action) =>
          this.adminCategoryApi
            .destroy(action.id)
            .pipe(
              switchMap(() => [
                CategoryActions.adminDestroySuccess({ id: action.id }),
                ServiceActions.adminDestroyWithDestroyedCategory({ categoryId: action.id }),
              ])
            ),
        onError: (action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось удалить категорию.');

          return of(CategoryActions.adminDestroyFailure({ id: action.id }));
        },
      })
    )
  );
}
