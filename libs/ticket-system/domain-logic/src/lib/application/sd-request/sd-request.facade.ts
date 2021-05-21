import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { tap, switchMap, catchError, map, withLatestFrom, distinctUntilChanged, share, startWith, filter } from 'rxjs/operators';
import { normalize } from 'normalizr';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestFeature from '../../infrastructure/store/sd-request/sd-request.reducer';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { sd_request_list_schema } from './../../infrastructure/schemas/normalizr.schema';

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
            // TODO: Выделить в класс SdRequestCacheService
            const normalizeData = normalize(sdRequestQueue, sd_request_list_schema)

            this.store.dispatch(SdRequestActions.loadAllSuccess({
              sd_requests: Object.values(normalizeData.entities.sd_requests),
              meta: sdRequestQueue.meta
            }))
          }),
          catchError(error => of(this.store.dispatch(SdRequestActions.loadAllFailure({ error }))))
        )
    ),
    share()
  );
  all$ = combineLatest([
    this.loadSdRequests$.pipe(startWith(null)),
    this.store.select(SdRequestSelectors.getAll)
  ]).pipe(
    map(([_dispatcher, selector]) => selector),
    distinctUntilChanged()
  );

  constructor(
    private store: Store<SdRequestFeature.SdRequestPartialState>,
    private sdRequestApi: SdRequestApi
  ) {}

  setPage(page: number) {
    this.store.dispatch(SdRequestActions.SetPage({ page }));
  }
}
