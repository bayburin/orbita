import { createAction, props } from '@ngrx/store';

import { SdRequestQueue } from '../../../entities/sd-request-queue.interface';

export const loadAll = createAction('[SdRequest/API] Load All');

export const loadAllSuccess = createAction(
  '[SdRequest/API] Load All Success',
  props<{ sdRequestQueue: SdRequestQueue }>()
);

export const loadAllFailure = createAction(
  '[SdRequest/API] Load All Failure',
  props<{ error: any }>()
);

export const SetPage = createAction(
  '[SdRequest] Set Page',
  props<{ page: number }>()
)
