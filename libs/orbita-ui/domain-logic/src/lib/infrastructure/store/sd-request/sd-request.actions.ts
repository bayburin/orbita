import { createAction, props } from '@ngrx/store';

import { SdRequest } from './../../../entities/models/sd-request.interface';
import { Meta } from './../../../entities/server-data/meta.interface';
import { LazyLoadEvent } from 'primeng/api';

export const loadAll = createAction('[SdRequest/API] Load All');

export const loadAllSuccess = createAction(
  '[SdRequest/API] Load All Success',
  props<{ sdRequests: SdRequest[]; meta: Meta }>()
);

export const loadAllFailure = createAction(
  '[SdRequest/API] Load All Failure',
  props<{ error: any }>()
);

export const SetTableMetadata = createAction(
  '[SdRequest] Set Table Metadata',
  props<{ data: LazyLoadEvent }>()
)