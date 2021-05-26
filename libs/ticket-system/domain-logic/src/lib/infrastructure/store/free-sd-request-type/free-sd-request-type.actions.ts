import { createAction, props } from '@ngrx/store';

import { FreeSdRequestType } from '../../../entities/models/sd/free-sd-request-type.interface';

export const loadAll = createAction('[FreeSdRequestType/API] Load All');

export const loadAllSuccess = createAction(
  '[FreeSdRequestType/API] Load All Success',
  props<{ freeSdRequestTypes: FreeSdRequestType[] }>()
);

export const loadAllFailure = createAction(
  '[FreeSdRequestType/API] Load All Failure',
  props<{ error: any }>()
);
