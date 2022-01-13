import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, tap } from 'rxjs/operators';
import { AuthHelper } from '@iss/ng-auth-center';
import { Router } from '@angular/router';

import { KaseFactory } from './../../factories/kase.factory';
import { KaseApi } from './../../api/kase/kase.api';
import { NotificationFacade } from '../../../application/notification/notification.facade';
import { UserApi } from '../../api/user/user.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as KaseActions from './kase.actions';
import * as KaseFeature from './kase.reducer';
import * as KaseSelectors from './kase.selectors';
import * as RouterSelectors from '../selectors/router.selectors';
import * as ServiceActions from '../service/service.actions';
import * as ServiceSelectors from '../service/service.selectors';

@Injectable()
export class KaseEffects {
  constructor(
    private readonly actions$: Actions,
    private kaseApi: KaseApi,
    private notificationFacade: NotificationFacade,
    private store: Store<KaseFeature.KasePartialState>,
    private authHelper: AuthHelper,
    private userApi: UserApi,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  // ========== Список заявок ==========

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.init),
      map(() => KaseActions.loadAll())
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.loadAll),
      withLatestFrom(
        this.store.select(KaseSelectors.getServiceIds),
        this.store.select(KaseSelectors.getSelectedStatusId)
      ),
      switchMap(([_action, serviceIds, selectedStatusId]) =>
        this.kaseApi.query({ limit: 15, offset: 0, status_id: selectedStatusId, service_ids: serviceIds }).pipe(
          switchMap((result) => {
            const statuses = result.statuses.map((status) => ({
              ...status,
              id: status.id === null ? status.id : +status.id,
              count: +status.count,
            }));

            return [KaseActions.setStatuses({ statuses }), KaseActions.loadAllSuccess({ kases: result.apps })];
          }),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось загрузить список заявок.');

            return of(KaseActions.loadAllFailure({ error }));
          })
        )
      )
    )
  );

  revoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.revoke),
      fetch({
        run: (action) =>
          this.kaseApi.revoke(action.caseId).pipe(
            tap(() => this.notificationFacade.showMessage(`Заявка №${action.caseId} отменена`)),
            map(() => KaseActions.revokeSuccess())
          ),
        onError: (action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось отменить заявку.');

          return KaseActions.revokeFailure({ error });
        },
      })
    )
  );

  vote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.vote),
      withLatestFrom(this.store.select(KaseSelectors.getEntities)),
      switchMap(([action, entities]) => {
        const payload = {
          ...entities[action.caseId],
          rating: action.rating,
        };

        return this.kaseApi.update(action.caseId, payload).pipe(
          tap(() => this.notificationFacade.showMessage(`Спасибо за оценку!`)),
          map(() => KaseActions.voteSuccess()),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось сохранить оценку.');

            return of(KaseActions.voteFailure({ error }));
          })
        );
      })
    )
  );

  revokeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.revokeSuccess, KaseActions.voteSuccess),
      map(() => KaseActions.loadAll())
    )
  );

  setSelectedStatusId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.setSelectedStatusId),
      map(() => KaseActions.loadAll())
    )
  );

  // ========== Форма новой заявки ==========

  initNewForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.initNewForm),
      map(() => KaseActions.loadParamsForNewForm())
    )
  );

  loadParamsForNewForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.loadParamsForNewForm),
      switchMap(() =>
        this.userApi.loadUserOwns().pipe(
          switchMap((owns) => {
            return [
              ServiceActions.setAll({ services: owns.services || [] }),
              KaseActions.setSvtItems({ svtItems: owns.items || [] }),
              KaseActions.loadParamsForNewFormSuccess(),
            ];
          }),
          catchError((error) => of(KaseActions.loadParamsForNewFormFailure({ error })))
        )
      )
    )
  );

  loadParamsForNewFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.loadParamsForNewFormSuccess),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParams), this.store.select(ServiceSelectors.getAll)),
      map(([_action, params, services]) => {
        const serviceName = params.service;
        const paramsData = {
          comment: params.comment,
          desc: params.desc,
          service: serviceName
            ? services.find((service) => service.name.toLowerCase() === serviceName.toLowerCase())
            : null,
          without_service: params.without_service,
          without_item: params.without_item,
        };
        const formData = KaseFactory.createViewForm(this.authHelper.getJwtPayload(), paramsData);

        return KaseActions.setInitialDataToNewForm({ formData });
      })
    )
  );

  loadParamsForNewFormFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.loadParamsForNewFormFailure),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParams)),
      map(([_action, params]) => {
        const paramsData = {
          comment: params.comment,
          desc: params.desc,
          without_service: true,
          without_item: true,
        };
        const formData = KaseFactory.createViewForm(this.authHelper.getJwtPayload(), paramsData);

        return KaseActions.setInitialDataToNewForm({ formData });
      })
    )
  );

  saveForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KaseActions.saveForm),
      withLatestFrom(this.store.select(KaseSelectors.getFormEntity)),
      switchMap(([_action, formData]) => {
        const serverForm = KaseFactory.createServerForm(formData);

        return this.kaseApi.save(serverForm).pipe(
          tap(() => this.notificationFacade.showMessage('Заявка создана')),
          map(() => KaseActions.saveFormSuccess()),
          tap(() => this.router.navigate(['/claims'])),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось создать заявку.');

            return of(KaseActions.saveFormFailure({ error }));
          })
        );
      })
    )
  );
}
