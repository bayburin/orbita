import { AuthHelper } from '@iss/ng-auth-center';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import * as SdRequestActions from './sd-request.actions';
import * as SdRequestFeature from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';
import * as SdRequestViewModelSelectors from '../selectors/sd-request-view-model.selectors';
import * as RouterSelectors from '../selectors/router.selectors';
import * as MessageActions from '../message/message.actions';
import * as WorkActions from '../work/work.actions';
import * as HistoryActions from '../history/history.actions';
import * as WorkerActions from '../worker/worker.actions';
import * as EmployeeActions from '../employee/employee.actions';
import * as SvtItemActions from '../svt-item/svt-item.actions';
import * as HostActions from '../host/host.actions';
// import * as ParameterActions from '../parameter/parameter.actions';
import * as UserSelectors from '../user/user.selectors';
import * as AttachmentActions from '../attachment/attachment.actions';
import * as SdTicketActions from '../sd-ticket/sd-ticket.actions';
import { SdRequestApi } from './../../api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../services/sd-request-cache.service';
import { SdRequestFactory } from './../../factories/sd-request.factory';
import { convertPrimeFilter } from './../../utils/convert-prime-filter.function';
import { calculatePage } from '../../utils/calculate-page.function';
import { EventApi } from '../../api/event/event.api';
import { EventTypeNames } from './../../../entities/models/event-type.interface';
import { EventBuilder } from './../../builders/event.builder';

@Injectable()
export class SdRequestEffects {
  constructor(
    private actions$: Actions,
    private sdRequestApi: SdRequestApi,
    private eventApi: EventApi,
    private store: Store<SdRequestFeature.SdRequestPartialState>,
    private messageService: MessageService,
    private authHelper: AuthHelper,
    private router: Router
  ) {}

  setPartials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.setPartials),
      switchMap((action) => [
        MessageActions.setAll({ messages: Object.values(action.entities.comments || []) }),
        WorkActions.setAll({ works: Object.values(action.entities.works || []) }),
        HistoryActions.setAll({ histories: Object.values(action.entities.histories || []) }),
        WorkerActions.setAll({ workers: Object.values(action.entities.workers || []) }),
      ])
    )
  );

  updatePartials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.updatePartials),
      switchMap((action) => [
        MessageActions.setMessages({ messages: Object.values(action.entities.comments || []) }),
        MessageActions.setMessages({ messages: Object.values(action.entities.workflows || []) }),
        WorkActions.setWorks({ works: Object.values(action.entities.works || []) }),
        HistoryActions.setHistories({ histories: Object.values(action.entities.histories || []) }),
        WorkerActions.setWorkers({ workers: Object.values(action.entities.workers || []) }),
        AttachmentActions.setAttachments({ attachments: Object.values(action.entities.attachments || []) }),
      ])
    )
  );

  // ========== Список заявок ==========

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.loadAll),
      switchMap((action) => {
        const data = action.data;

        return this.sdRequestApi
          .query(calculatePage(data.first, data.rows), data.rows, convertPrimeFilter(data.filters))
          .pipe(
            switchMap((data) => {
              const normalizeData = SdRequestCacheService.normalizeSdRequests(data.sd_requests).entities;

              return [
                SdRequestActions.setPartials({ entities: normalizeData }),
                SdRequestActions.loadAllSuccess({
                  sdRequests: Object.values(normalizeData.sd_requests || []),
                  meta: data.meta,
                }),
              ];
            }),
            catchError((error) => of(SdRequestActions.loadAllFailure({ error })))
          );
      })
    )
  );

  clearAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.clearAll),
      switchMap(() => [
        MessageActions.clearAll(),
        WorkActions.clearAll(),
        HistoryActions.clearAll(),
        WorkerActions.clearAll(),
        AttachmentActions.clearAll(),
      ])
    )
  );

  // ========== Просмотр выбранной заявки ==========

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, routeParams]) =>
        this.sdRequestApi.show(routeParams.id).pipe(
          map((data) => SdRequestCacheService.normalizeSdRequest(data.sd_request)),
          switchMap((normalizeData) => [
            SdRequestActions.updatePartials({ entities: normalizeData.entities }),
            // Вызывать обновление хранилища заявок после того, как будут сохранены все его составные части
            SdRequestActions.loadSelectedSuccess({
              sdRequest: normalizeData.entities.sd_requests[normalizeData.result],
            }),
          ]),
          catchError((error) => of(SdRequestActions.loadSelectedFailure({ error })))
        )
      )
    )
  );

  loadSelectedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.loadSelectedSuccess),
      withLatestFrom(this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel)),
      switchMap(([action, sdRequestViewModel]) => {
        return [
          // ParameterActions.loadAll(),
          EmployeeActions.selectEmployee({ idTn: action.sdRequest.source_snapshot.id_tn }),
          SvtItemActions.select({ barcode: action.sdRequest.source_snapshot.barcode }),
          HostActions.select({ inventNum: action.sdRequest.source_snapshot.invent_num }),
          SdTicketActions.selectTicketIdentity({ identity: action.sdRequest.ticket_identity }),
          SdRequestActions.initUpdateForm({ sdRequestViewModel }),
        ];
      })
    )
  );

  clearSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.clearSelected),
      switchMap(() => [
        // ParameterActions.clearAll(),
        EmployeeActions.clearSelectedEmployee(),
        SvtItemActions.clearSelected(),
        HostActions.clearSelected(),
        SdRequestActions.disableSelectedEditMode(),
      ])
    )
  );

  close$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SdRequestActions.close),
        switchMap((action) => {
          const event = new EventBuilder().claim_id(action.id).event_type(EventTypeNames.CLOSE).build();

          return this.eventApi.create(event).pipe(
            tap(() => this.messageService.add({ key: 'global', severity: 'success', detail: 'Заявка закрыта' })),
            map(() => this.router.navigate(['/tickets']))
          );
        })
      ),
    { dispatch: false }
  );

  // ========== Форма существующей заявки ==========

  saveUpdateForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.saveUpdateForm),
      withLatestFrom(
        this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel),
        this.store.select(SdRequestSelectors.getFormEntity),
        this.store.select(UserSelectors.getAll)
      ),
      switchMap(([_action, sdRequestViewModel, formData, users]) =>
        this.sdRequestApi
          .update(
            sdRequestViewModel.id,
            SdRequestFactory.createServerForm(formData, sdRequestViewModel, this.authHelper.getJwtPayload(), users)
          )
          .pipe(
            switchMap((data) => {
              const normalizeData = SdRequestCacheService.normalizeSdRequest(data.sd_request);
              const changedSdRequest = normalizeData.entities.sd_requests[normalizeData.result];

              return [
                SdRequestActions.toggleSelectedEditMode(),
                SdRequestActions.updatePartials({ entities: normalizeData.entities }),
                // Вызывать обновление хранилища заявок после того, как будут сохранены все его составные части
                SdRequestActions.saveFormSuccess({ sdRequest: changedSdRequest }),
              ];
            }),
            catchError((error) => of(SdRequestActions.saveFormFailure({ error })))
          )
      )
    )
  );

  saveFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.saveFormSuccess),
      tap(() => this.messageService.add({ key: 'global', severity: 'success', detail: 'Заявка обновлена' })),
      withLatestFrom(this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel)),
      map(([_action, sdRequestViewModel]) => SdRequestActions.initUpdateForm({ sdRequestViewModel }))
    )
  );

  reinitUpdateForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.reinitUpdateForm),
      withLatestFrom(this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel)),
      map(([_action, sdRequestViewModel]) => SdRequestActions.initUpdateForm({ sdRequestViewModel }))
    )
  );

  // ========== Форма новой заявки ==========

  initNewForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.initNewForm),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParams)),
      switchMap(([_action, queryParams]) => {
        const callActions = [];

        if (queryParams.id_tn) {
          callActions.push(
            EmployeeActions.loadEmployeeShortForNewForm({
              idTn: queryParams.id_tn,
              loadSvtItems: !queryParams.barcode,
            })
          );
        }

        if (queryParams.barcode) {
          callActions.push(SvtItemActions.loadAllForForm({ filters: { barcode: queryParams.barcode } }));
        }

        return callActions;
      })
    )
  );

  saveNewForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.saveNewForm),
      withLatestFrom(this.store.select(SdRequestSelectors.getNewFormEntity)),
      switchMap(([_action, form]) =>
        this.sdRequestApi.create(SdRequestFactory.createNewServerForm(form)).pipe(
          switchMap((data) => {
            const normalizeData = SdRequestCacheService.normalizeSdRequest(data.sd_request);
            const newSdRequest = normalizeData.entities.sd_requests[normalizeData.result];

            return [
              SdRequestActions.updatePartials({ entities: normalizeData.entities }),
              // Вызывать обновление хранилища заявок после того, как будут сохранены все его составные части
              SdRequestActions.saveNewFormSuccess({ sdRequest: newSdRequest }),
              SdRequestActions.showModalAfterCreateNewForm(),
            ];
          }),
          catchError((error) => of(SdRequestActions.saveNewFormFailure({ error })))
        )
      )
    )
  );

  // ========== Обновление данных по заявке ==========

  processWebSocketOnCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SdRequestActions.processWebSocketOnCreate),
        tap(() => {
          this.messageService.clear('newSdRequestsNotify');
          this.messageService.add({
            key: 'newSdRequestsNotify',
            sticky: true,
            severity: 'info',
            summary: 'Появились новые заявки',
          });
        })
      ),
    { dispatch: false }
  );

  processWebSocketOnUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.processWebSocketOnUpdate),
      withLatestFrom(
        this.store.select(SdRequestSelectors.getEntities),
        this.store.select(SdRequestSelectors.getSelectedId)
      ),
      switchMap(([action, entities, selectedId]) => {
        const id = action.sdRequest.id;

        if (!entities[id]) {
          return [];
        }

        const normalizeData = SdRequestCacheService.normalizeSdRequest(action.sdRequest);
        // Если обновились данные по текущей заявке, установить соответствующий флаг
        const needToGetNewData = id === selectedId;

        return [
          SdRequestActions.updatePartials({ entities: normalizeData.entities }),
          SdRequestActions.update({ sdRequest: normalizeData.entities.sd_requests[id], needToGetNewData }),
        ];
      })
    )
  );
}
