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
                ServiceActions.adminLoadAllSuccess({ entities: data.entities.services, ids: data.result as number[] }),
                CategoryActions.setEntities({ entities: data.entities.categories || {} }),
                ResponsibleUserActions.setEntities({ entities: data.entities.responsible_users || {} }),
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

  adminSaveForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.adminSaveForm),
      withLatestFrom(this.store.select(ServiceSelectors.getFormData)),
      switchMap(([_action, formData]) => {
        if (formData.id) {
          return this.adminServiceApi.update(formData.id, formData).pipe(
            tap(() => this.notificationFacade.showMessage('Услуга обновлена')),
            map((service) => ServiceActions.adminSaveFormSuccess({ service })),
            catchError((error) => {
              this.errorHandlerService.handleError(error, 'Не удалось обновить услугу.');

              return of(ServiceActions.adminSaveFormFailure({ error }));
            })
          );
        } else {
          return this.adminServiceApi.save(formData).pipe(
            tap(() => this.notificationFacade.showMessage('Услуга создана')),
            map((service) => ServiceActions.adminSaveFormSuccess({ service })),
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
}
