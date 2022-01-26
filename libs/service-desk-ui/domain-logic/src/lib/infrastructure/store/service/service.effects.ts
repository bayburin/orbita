import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, catchError, map, tap } from 'rxjs/operators';

import { ServiceApi } from '../../api/service/service.api';
import { ServiceCacheService } from '../../services/service-cache.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AdminServiceApi } from './../../api/admin/admin-service/admin-service.api';
import { NotificationFacade } from '../../../application/notification/notification.facade';
import { ServiceFactory } from '../../factories/service.factory';
import * as ServiceActions from './service.actions';
import * as ServiceFeature from './service.reducer';
import * as ServiceSelectors from './service.selectors';
import * as RouterSelectors from '../selectors/router.selectors';
import * as CategoryActions from '../category/category.actions';
import * as QuestionActions from '../question/question.actions';
import * as AnswerActions from '../answer/answer.actions';
import * as ResponsibleUserActions from '../responsible-user/responsible-user.actions';
import * as AttachmentActions from '../attachment/attachment.actions';

@Injectable()
export class ServiceEffects {
  constructor(
    private readonly actions$: Actions,
    private serviceApi: ServiceApi,
    private adminServiceApi: AdminServiceApi,
    private store: Store<ServiceFeature.ServicePartialState>,
    private errorHandlerService: ErrorHandlerService,
    private notificationFacade: NotificationFacade
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, params]) =>
        this.serviceApi.show(params.id).pipe(
          switchMap((service) => {
            const data = ServiceCacheService.normalizeServices(service).entities;

            return [
              AttachmentActions.setEntities({ entities: data.attachments || {} }),
              AnswerActions.setEntities({ entities: data.answers || {} }),
              QuestionActions.setEntities({ entities: data.questions || {} }),
              ResponsibleUserActions.setEntities({ entities: data.responsible_users || {} }),
              CategoryActions.setEntities({ entities: data.categories || {} }),
              CategoryActions.setSelectedId({ selectedId: service.category_id }),
              ServiceActions.loadSelectedSuccess({ service: data.services[params.id] }),
            ];
          }),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить данные по выбранной услуге.');

            return of(ServiceActions.loadSelectedFailure({ error }));
          })
        )
      )
    )
  );

  // ========== Администрирование ==========

  adminLoadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminLoadAll),
      fetch({
        run: (_action) =>
          this.adminServiceApi.query().pipe(
            switchMap((services) => {
              const data = ServiceCacheService.normalizeServices(services);

              return [
                CategoryActions.setEntities({ entities: data.entities.categories || {} }),
                ResponsibleUserActions.setEntities({ entities: data.entities.responsible_users || {} }),
                ServiceActions.adminLoadAllSuccess({ entities: data.entities.services, ids: data.result as number[] }),
              ];
            })
          ),
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось загрузить список услуг.');

          return ServiceActions.adminLoadAllFailure({ error });
        },
      })
    )
  );

  adminSelect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminSelect),
      map((action) =>
        action.edit ? ServiceActions.adminLoadSelectedOnEdit() : ServiceActions.adminLoadSelectedOnShow()
      )
    )
  );

  adminLoadSelectedOnEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminLoadSelectedOnEdit),
      withLatestFrom(this.store.select(ServiceSelectors.getSelectedId)),
      switchMap(([_action, selectedId]) =>
        this.adminServiceApi.edit(selectedId).pipe(
          switchMap((service) => {
            const data = ServiceCacheService.normalizeServices(service).entities;

            return [
              AttachmentActions.setEntities({ entities: data.attachments || {} }),
              AnswerActions.setEntities({ entities: data.answers || {} }),
              QuestionActions.setEntities({ entities: data.questions || {} }),
              CategoryActions.setOne({ category: data.categories[service.category_id] }),
              ResponsibleUserActions.setMany({
                responsibleUsers: Object.values(data.responsible_users || []),
              }),
              ServiceActions.adminLoadSelectedOnEditSuccess({ service: data.services[selectedId] }),
              ServiceActions.adminInitForm({ service }),
            ];
          }),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить услугу.');

            return of(ServiceActions.adminLoadSelectedOnEditFailure({ error }));
          })
        )
      )
    )
  );

  adminLoadSelectedOnShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminLoadSelectedOnShow),
      withLatestFrom(this.store.select(ServiceSelectors.getSelectedId)),
      switchMap(([_action, selectedId]) =>
        this.adminServiceApi.show(selectedId).pipe(
          switchMap((service) => {
            const data = ServiceCacheService.normalizeServices(service).entities;

            return [
              CategoryActions.setOne({ category: data.categories[service.category_id] }),
              ResponsibleUserActions.setMany({
                responsibleUsers: Object.values(data.responsible_users || []),
              }),
              ServiceActions.adminLoadSelectedOnShowSuccess({ service: data.services[selectedId] }),
              ServiceActions.adminInitForm({ service }),
            ];
          }),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить услугу.');

            return of(ServiceActions.adminLoadSelectedOnShowFailure({ error }));
          })
        )
      )
    )
  );

  adminSaveForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminSaveForm),
      withLatestFrom(this.store.select(ServiceSelectors.getFormData)),
      switchMap(([_action, formData]) => {
        if (formData.id) {
          return this.adminServiceApi.update(formData.id, ServiceFactory.createServerForm(formData)).pipe(
            tap(() => this.notificationFacade.showMessage('Услуга обновлена')),
            switchMap((service) => {
              const data = ServiceCacheService.normalizeServices(service);

              return [
                CategoryActions.setOne({ category: data.entities.categories[service.category_id] }),
                ResponsibleUserActions.setMany({
                  responsibleUsers: Object.values(data.entities.responsible_users || []),
                }),
                ServiceActions.adminSaveFormSuccess({ service: data.entities.services[data.result as number] }),
              ];
            }),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось обновить услугу.');

              return of(ServiceActions.adminSaveFormFailure({ error }));
            })
          );
        } else {
          return this.adminServiceApi.save(ServiceFactory.createServerForm(formData)).pipe(
            tap(() => this.notificationFacade.showMessage('Услуга создана')),
            switchMap((service) => {
              const data = ServiceCacheService.normalizeServices(service);

              return [
                CategoryActions.setOne({ category: data.entities.categories[service.category_id] }),
                ResponsibleUserActions.setMany({
                  responsibleUsers: Object.values(data.entities.responsible_users || []),
                }),
                ServiceActions.adminSaveFormSuccess({ service: data.entities.services[data.result as number] }),
              ];
            }),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось сохранить услугу.');

              return of(ServiceActions.adminSaveFormFailure({ error }));
            })
          );
        }
      })
    )
  );

  adminSaveFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminSaveFormSuccess),
      map(() => ServiceActions.adminCloseForm())
    )
  );

  adminDestroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminDestroy),
      fetch({
        run: (action) =>
          this.adminServiceApi
            .destroy(action.id)
            .pipe(map(() => ServiceActions.adminDestroySuccess({ id: action.id }))),
        onError: (action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось удалить услугу.');

          return of(ServiceActions.adminDestroyFailure({ id: action.id }));
        },
      })
    )
  );
}
