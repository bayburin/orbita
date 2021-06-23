import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as SdRequestActions from './sd-request.actions';
import * as fromSdRequest from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';
import * as RouterSelector from '../selectors/router.selectors';
import * as MessageActions from '../message/message.actions';
import * as WorkActions from '../work/work.actions';
import * as HistoryActions from '../history/history.actions';
import * as WorkerActions from '../worker/worker.actions';
import { SdRequestApi } from './../../api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../services/sd-request-cache.service';

@Injectable()
export class SdRequestEffects {
  constructor(
    private actions$: Actions,
    private sdRequestApi: SdRequestApi,
    private store: Store<fromSdRequest.SdRequestPartialState>
  ) {}

  // loadAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SdRequestActions.SetPage),
  //     tap(() => this.store.dispatch(SdRequestActions.loadAll())),
  //     withLatestFrom(this.store.select(SdRequestSelectors.getPerPage)),
  //     switchMap(([action, perPage]) => this.sdRequestApi.query(action.page, perPage)
  //       .pipe(
  //         map(sdRequestQueue => SdRequestActions.loadAllSuccess({ sdRequestQueue })),
  //         catchError(error => of(SdRequestActions.loadAllFailure({ error })))
  //       )
  //     )
  //   )
  // );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdRequestActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelector.selectRouteParams)),
      switchMap(([_action, routeParams]) =>
        this.sdRequestApi.show(routeParams.id).pipe(
          map((data) => SdRequestCacheService.normalizeSdRequest(data.sd_request)),
          switchMap((normalizeData) => [
            SdRequestActions.loadSelectedSuccess({
              sdRequest: normalizeData.entities.sd_requests[normalizeData.result],
            }),
            MessageActions.setMessages({ messages: Object.values(normalizeData.entities.comments || []) }),
            WorkActions.setWorks({ works: Object.values(normalizeData.entities.works || []) }),
            HistoryActions.setHistories({ histories: Object.values(normalizeData.entities.histories || []) }),
            WorkerActions.setWorkers({ workers: Object.values(normalizeData.entities.workers || []) }),
          ]),
          catchError((error) => of(SdRequestActions.loadSelectedFailure({ error })))
        )
      )
    )
  );
}
