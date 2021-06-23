import { createAction, props } from '@ngrx/store';

import { SdRequest } from './../../../entities/models/sd-request.interface';
import { Meta } from './../../../entities/server-data/meta.interface';
import { LazyLoadEvent } from 'primeng/api';

export const loadAll = createAction('[SdRequest/API] Load All');

export const loadAllSuccess = createAction(
  '[SdRequest/API] Load All Success',
  props<{ sdRequests: SdRequest[]; meta: Meta }>()
);

export const loadAllFailure = createAction('[SdRequest/API] Load All Failure', props<{ error: any }>());

export const SetTableMetadata = createAction('[SdRequest] Set Table Metadata', props<{ data: LazyLoadEvent }>());

export const ReloadEntities = createAction('[SdRequest] Reload Entities');

export const loadSelected = createAction('[SdRequest/API] Load Selected');

export const loadSelectedSuccess = createAction(
  '[SdRequest/API] Load Selected Success',
  props<{ sdRequest: SdRequest }>()
);

export const loadSelectedFailure = createAction('[SdRequest/API] Load Selected Failure', props<{ error: any }>());
