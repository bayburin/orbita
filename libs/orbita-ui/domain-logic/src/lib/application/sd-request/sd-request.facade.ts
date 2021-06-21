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
import * as SdRequestViewModelSelectors from '../../infrastructure/store/view-model/sd-request-view-model.selectors';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../infrastructure/services/sd-request-cache.service';
import { MessageFacade } from './../message/message.facade';
import { WorkFacade } from './../work/work.facade';
import { HistoryFacade } from './../history/history.facade';
import { WorkerFacade } from './../worker/worker.facade';

/**
 * Фасад для работы с заявками (обращения к хранилищу SdRequest)
 */
@Injectable({
  providedIn: 'root',
})
export class SdRequestFacade implements SdRequestFacadeAbstract {
  firstRowIndex$ = this.store.select(SdRequestSelectors.getFirstRowIndex);
  totalCount$ = this.store.select(SdRequestSelectors.getTotalCount);
  perPage$ = this.store.select(SdRequestSelectors.getPerPage);
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
          const normalizeData = SdRequestCacheService.normalizeSdRequests(data).entities;

          this.store.dispatch(
            SdRequestActions.loadAllSuccess({
              sdRequests: Object.values(normalizeData.sd_requests || []),
              meta: data.meta,
            })
          );

          this.messageFacade.setMessages(Object.values(normalizeData.comments || []));
          this.workFacade.setWorks(Object.values(normalizeData.works || []));
          this.historyFacade.setHistories(Object.values(normalizeData.histories || []));
          this.workerFacade.setWorkers(Object.values(normalizeData.workers || []));
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
}
