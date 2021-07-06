import { LazyLoadEvent } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import {
  tap,
  switchMap,
  catchError,
  map,
  withLatestFrom,
  distinctUntilChanged,
  share,
  startWith,
  filter,
} from 'rxjs/operators';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestFeature from '../../infrastructure/store/sd-request/sd-request.reducer';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import * as SdRequestViewModelSelectors from '../../infrastructure/store/selectors/sd-request-view-model.selectors';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../infrastructure/services/sd-request-cache.service';
import { MessageFacade } from './../message/message.facade';
import { WorkFacade } from './../work/work.facade';
import { HistoryFacade } from './../history/history.facade';
import { WorkerFacade } from './../worker/worker.facade';
import { SdRequestForm } from './../../entities/forms/sd-request-form.interface';

/**
 * Фасад для работы с заявками (обращения к хранилищу SdRequest)
 */
@Injectable({
  providedIn: 'root',
})
export class SdRequestFacade implements SdRequestFacadeAbstract {
  // ========== Список заявок ==========

  firstRowIndex$ = this.store.select(SdRequestSelectors.getFirstRowIndex);
  totalCount$ = this.store.select(SdRequestSelectors.getTotalCount);
  perPage$ = this.store.select(SdRequestSelectors.getPerPage);
  sortField$ = this.store.select(SdRequestSelectors.getSortField);
  sortOrder$ = this.store.select(SdRequestSelectors.getSortOrder);
  loading$ = this.store.select(SdRequestSelectors.getLoading);
  loaded$ = this.store.select(SdRequestSelectors.getLoaded);
  loadSdRequests$ = this.store.select(SdRequestSelectors.getNeedTickets).pipe(
    filter((needTickets) => needTickets),
    tap(() => this.store.dispatch(SdRequestActions.loadAll())),
    withLatestFrom(
      this.store.select(SdRequestSelectors.getPage),
      this.perPage$,
      this.store.select(SdRequestSelectors.getFilters)
    ),
    switchMap(([_need, page, perPage, filters]) =>
      this.sdRequestApi.query(page, perPage, filters).pipe(
        tap((data) => {
          const normalizeData = SdRequestCacheService.normalizeSdRequests(data.sd_requests).entities;

          this.store.dispatch(
            SdRequestActions.loadAllSuccess({
              sdRequests: Object.values(normalizeData.sd_requests || []),
              meta: data.meta,
            })
          );
          this.messageFacade.replaceAllMessages(Object.values(normalizeData.comments || []));
          this.workFacade.replaceAllWorks(Object.values(normalizeData.works || []));
          this.historyFacade.replaceAllHistories(Object.values(normalizeData.histories || []));
          this.workerFacade.replaceAllWorkers(Object.values(normalizeData.workers || []));
        }),
        catchError((error) => of(this.store.dispatch(SdRequestActions.loadAllFailure({ error }))))
      )
    ),
    share()
  );
  all$ = combineLatest([
    this.loadSdRequests$.pipe(startWith(null)),
    this.store.select(SdRequestViewModelSelectors.getAllViewModel),
  ]).pipe(
    map(([_dispatcher, selector]) => selector),
    distinctUntilChanged()
  );
  error$ = this.store.select(SdRequestSelectors.getError);

  // ========== Просмотр выбранной заявки ==========

  selectedEntity$ = this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel);
  selectedSkeleton$ = this.store.select(SdRequestSelectors.getSelectedSkeleton);
  selectedEditMode$ = this.store.select(SdRequestSelectors.getSelectedEditMode);
  selectedError$ = this.store.select(SdRequestSelectors.getSelectedError);
  orderedHistories$ = this.store.select(SdRequestViewModelSelectors.getOrderedHistories);

  // ========== Форма заявки ==========

  formEntity$ = this.store.select(SdRequestViewModelSelectors.getFormEntityViewModel);
  formLoading$ = this.store.select(SdRequestSelectors.getFormLoading);

  constructor(
    private store: Store<SdRequestFeature.SdRequestPartialState>,
    private sdRequestApi: SdRequestApi,
    private messageFacade: MessageFacade,
    private workFacade: WorkFacade,
    private historyFacade: HistoryFacade,
    private workerFacade: WorkerFacade
  ) {}

  setTableMetadata(event: LazyLoadEvent) {
    this.store.dispatch(SdRequestActions.SetTableMetadata({ data: event }));
  }

  reloadTableData() {
    this.store.dispatch(SdRequestActions.ReloadEntities());
  }

  loadSelectedSdRequest() {
    this.store.dispatch(SdRequestActions.loadSelected());
  }

  clearSelected() {
    this.store.dispatch(SdRequestActions.clearSelected());
  }

  toggleEditMode() {
    this.store.dispatch(SdRequestActions.toggleSelectedEditMode());
  }

  changeForm(form: SdRequestForm) {
    this.store.dispatch(SdRequestActions.changeForm({ entity: form }));
  }

  updateForm() {
    this.store.dispatch(SdRequestActions.saveUpdateForm());
  }
}
