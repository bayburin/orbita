import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

import * as SdRequestActions from './sd-request.actions';
import * as SdRequestFeature from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';
import * as SdRequestViewModelSelectors from '../selectors/sd-request-view-model.selectors';
import * as RouterSelector from '../selectors/router.selectors';
import * as MessageActions from '../message/message.actions';
import * as WorkActions from '../work/work.actions';
import * as HistoryActions from '../history/history.actions';
import * as WorkerActions from '../worker/worker.actions';
import * as EmployeeActions from '../employee/employee.actions';
import * as SvtItemActions from '../svt-item/svt-item.actions';
import * as HostActions from '../host/host.actions';
import * as ParameterActions from '../parameter/parameter.actions';
import { SdRequestApi } from './../../api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../services/sd-request-cache.service';

@Injectable()
export class SdRequestEffects {
  constructor(
    private actions$: Actions,
    private sdRequestApi: SdRequestApi,
    private store: Store<SdRequestFeature.SdRequestPartialState>,
    private messageService: MessageService
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
        WorkActions.setWorks({ works: Object.values(action.entities.works || []) }),
        HistoryActions.setHistories({ histories: Object.values(action.entities.histories || []) }),
        WorkerActions.setWorkers({ workers: Object.values(action.entities.workers || []) }),
      ])
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelector.selectRouteParams)),
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
          ParameterActions.loadAll(),
          EmployeeActions.selectEmployee({ idTn: action.sdRequest.source_snapshot.id_tn }),
          SvtItemActions.select({ barcode: action.sdRequest.source_snapshot.barcode }),
          HostActions.select({ inventNum: action.sdRequest.source_snapshot.invent_num }),
          SdRequestActions.initUpdateForm({ sdRequestViewModel }),
        ];
      })
    )
  );

  clearSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.clearSelected),
      switchMap(() => [
        ParameterActions.clearAll(),
        EmployeeActions.clearSelectedEmployee(),
        SvtItemActions.clearSelected(),
        HostActions.clearSelected(),
        SdRequestActions.disableSelectedEditMode(),
      ])
    )
  );

  saveUpdateForm = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.saveUpdateForm),
      withLatestFrom(
        this.store.select(SdRequestSelectors.getSelectedEntity),
        this.store.select(SdRequestSelectors.getFormEntity)
      ),
      switchMap(([_action, sdRequest, formData]) =>
        this.sdRequestApi.update(sdRequest.id, formData).pipe(
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

  saveFormSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.saveFormSuccess),
      tap(() => this.messageService.add({ severity: 'success', detail: 'Заявка обновлена' })),
      withLatestFrom(this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel)),
      map(([_action, sdRequestViewModel]) => SdRequestActions.initUpdateForm({ sdRequestViewModel }))
    )
  );
}
