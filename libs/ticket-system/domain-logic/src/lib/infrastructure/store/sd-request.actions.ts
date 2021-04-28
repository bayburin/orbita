import { createAction, props } from '@ngrx/store';
import { SdRequest } from '../../entities/sd-request.interface';

export const loadAll = createAction('[SdRequest/API] Load All');

export const loadAllSuccess = createAction(
  '[SdRequest/API] Load All Success',
  props<{ sdRequests: SdRequest[] }>()
);

export const loadAllFailure = createAction(
  '[SdRequest/API] Load All Failure',
  props<{ error: any }>()
);
