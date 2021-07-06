import { createAction, props } from '@ngrx/store';

import { SdRequest } from './../../../entities/models/sd-request.interface';
import { Meta } from './../../../entities/server-data/meta.interface';
import { LazyLoadEvent } from 'primeng/api';
import { SdRequestForm } from './../../../entities/forms/sd-request-form.interface';

// ========== Список заявок ==========

export const loadAll = createAction('[SdRequest/API] Load All');

export const loadAllSuccess = createAction(
  '[SdRequest/API] Load All Success',
  props<{ sdRequests: SdRequest[]; meta: Meta }>()
);

export const loadAllFailure = createAction('[SdRequest/API] Load All Failure', props<{ error: any }>());

export const SetTableMetadata = createAction('[SdRequest] Set Table Metadata', props<{ data: LazyLoadEvent }>());

export const ReloadEntities = createAction('[SdRequest] Reload Entities');

// ========== Просмотр выбранной заявки ==========

export const loadSelected = createAction('[SdRequest/API] Load Selected');

export const loadSelectedSuccess = createAction(
  '[SdRequest/API] Load Selected Success',
  props<{ sdRequest: SdRequest }>()
);

export const loadSelectedFailure = createAction('[SdRequest/API] Load Selected Failure', props<{ error: string }>());

export const clearSelected = createAction('[SdRequest] Clear Selected');

// ========== Форма заявки ==========

export const initUpdateForm = createAction('[SdRequest] Init Update Form', props<{ sdRequest: SdRequest }>());

export const changeForm = createAction('[SdRequest] Change Form', props<{ entity: SdRequestForm }>());

export const saveUpdateForm = createAction('[SdRequest/API] Save Update Form');

export const saveFormSuccess = createAction('[SdRequest/API] Save Form Success', props<{ sdRequest: SdRequest }>());

export const saveFormFailure = createAction('[SdRequest/API] Save Form Failure', props<{ error: any }>());
