import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { tap, switchMap, catchError, map, withLatestFrom, distinctUntilChanged, share, startWith, filter } from 'rxjs/operators';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestFeature from '../../infrastructure/store/sd-request/sd-request.reducer';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import * as SdRequestViewModelSelectors from '../../infrastructure/store/view-model/sd-request-view-model.selectors';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../infrastructure/services/sd-request-cache.service';
import { MessageFacade } from './../message/message.facade';
import { WorkFacade } from './../work/work.facade';

/**
 * Фасад для работы с заявками (обращения к стору SdRequest)
 */
@Injectable({
  providedIn: 'root'
})
export class SdRequestFacade implements SdRequestFacadeAbstract {
  // TODO: Исправить
  // selected$ = this.store.select(SdRequestSelectors.getSelected);
  page$ = this.store.select(SdRequestSelectors.getPage);
  totalCount$ = this.store.select(SdRequestSelectors.getTotalCount);
  maxSize$ = this.store.select(SdRequestSelectors.getMaxSize);
  loading$ = this.store.select(SdRequestSelectors.getLoading);
  loaded$ = this.store.select(SdRequestSelectors.getLoaded);
  loadSdRequests$ = this.loaded$.pipe(
    filter(loaded => !loaded),
    tap(() => this.store.dispatch(SdRequestActions.loadAll())),
    withLatestFrom(this.page$, this.maxSize$),
    switchMap(([_loaded, page, maxSize]) =>
      this.sdRequestApi.query(page, maxSize)
        .pipe(
          tap(sdRequestQueue => {
            const normalizeData = SdRequestCacheService.normalizeSdRequests(sdRequestQueue)

            this.store.dispatch(SdRequestActions.loadAllSuccess({
              sd_requests: Object.values(normalizeData.entities.sd_requests),
              meta: sdRequestQueue.meta
            }));

            this.messageFacade.setMessages(Object.values(normalizeData.entities.comments));
            this.workFacade.setWorks(Object.values(normalizeData.entities.works));
          }),
          catchError(error => of(this.store.dispatch(SdRequestActions.loadAllFailure({ error }))))
        )
    ),
    share()
  );
  all$ = combineLatest([
    this.loadSdRequests$.pipe(startWith(null)),
    this.store.select(SdRequestViewModelSelectors.getAllViewModel)
  ]).pipe(
    map(([_dispatcher, selector]) => selector),
    distinctUntilChanged()
  );

  constructor(
    private store: Store<SdRequestFeature.SdRequestPartialState>,
    private sdRequestApi: SdRequestApi,
    private messageFacade: MessageFacade,
    private workFacade: WorkFacade
  ) {}

  setPage(page: number) {
    this.store.dispatch(SdRequestActions.SetPage({ page }));
  }
}
