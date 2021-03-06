import { createAction, props } from '@ngrx/store';

import { SdRequest } from './../../../entities/models/sd-request.interface';
import { Meta } from './../../../entities/server-data/meta.interface';
import { LazyLoadEvent } from 'primeng/api';
import { SdRequestViewForm } from './../../../entities/forms/sd-request-view-form.interface';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';
import { NormalizedSdRequestEntities } from './../../../entities/models/normalized-data.interface';
import { NewSdRequestViewForm } from './../../../entities/forms/new-sd-request-view-form.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import { SvtItem } from '../../../entities/models/svt/svt-item.interface';

// ========== Список заявок ==========

export const loadAll = createAction('[SdRequest/API] Load All', props<{ data: LazyLoadEvent }>());

export const loadAllSuccess = createAction(
  '[SdRequest/API] Load All Success',
  props<{ sdRequests: SdRequest[]; meta: Meta }>()
);

export const loadAllFailure = createAction('[SdRequest/API] Load All Failure', props<{ error: any }>());

export const setPartials = createAction('[SdRequest] Set Partials', props<{ entities: NormalizedSdRequestEntities }>());

export const updatePartials = createAction(
  '[SdRequest] Update Partials',
  props<{ entities: NormalizedSdRequestEntities }>()
);

export const clearAll = createAction('[SdRequest] Clear All');

export const addComment = createAction('[SdRequest] Add Comment', props<{ id: number; commentId: number }>());

// ========== Просмотр выбранной заявки ==========

export const loadSelected = createAction('[SdRequest/API] Load Selected');

export const loadSelectedSuccess = createAction(
  '[SdRequest/API] Load Selected Success',
  props<{ sdRequest: SdRequest }>()
);

export const loadSelectedFailure = createAction('[SdRequest/API] Load Selected Failure', props<{ error: string }>());

export const clearSelected = createAction('[SdRequest] Clear Selected');

export const toggleSelectedEditMode = createAction('[SdRequest] Toggle Selected Edit Mode');

export const disableSelectedEditMode = createAction('[SdRequest] Disable Selected Edit Mode');

export const close = createAction('[SdRequest] Close', props<{ id: number }>());

// ========== Форма существующей заявки ==========

export const initUpdateForm = createAction(
  '[SdRequest] Init Update Form',
  props<{ sdRequestViewModel: SdRequestViewModel }>()
);

export const changeForm = createAction('[SdRequest] Change Form', props<{ entity: SdRequestViewForm }>());

export const saveUpdateForm = createAction('[SdRequest/API] Save Update Form');

export const saveFormSuccess = createAction('[SdRequest/API] Save Form Success', props<{ sdRequest: SdRequest }>());

export const saveFormFailure = createAction('[SdRequest/API] Save Form Failure', props<{ error: any }>());

export const reinitUpdateForm = createAction('[SdRequest] Reinit Update Form');

// ========== Форма новой заявки ==========

export const initNewForm = createAction('[SdRequest] Init New Form');

export const setEmployeeToNewForm = createAction(
  '[SdRequest] Set Employee To New Form',
  props<{ employee: EmployeeShort }>()
);

export const setSvtItemToNewForm = createAction('[SdRequest] Set SvtItem To New Form', props<{ svtItem: SvtItem }>());

export const changeNewForm = createAction('[SdRequest] Change New Form', props<{ entity: NewSdRequestViewForm }>());

export const saveNewForm = createAction('[SdRequest/API] Save New Form');

export const saveNewFormSuccess = createAction(
  '[SdRequest/API] Save New Form Success',
  props<{ sdRequest: SdRequest }>()
);

export const saveNewFormFailure = createAction('[SdRequest/API] Save New Form Failure', props<{ error: any }>());

export const showModalAfterCreateNewForm = createAction('[SdRequest] Show Modal After Create New Form');

export const closeModalAfterCreateNewForm = createAction('[SdRequest] Close Modal After Create New Form');

export const clearNewForm = createAction('[SdRequest] Clear New Form');

// ========== Обновление данных по заявке ==========

export const processWebSocketOnCreate = createAction('[SdRequest] Process Web Socket On Create');

export const processWebSocketOnUpdate = createAction(
  '[SdRequest] Process Web Socket On Update',
  props<{ sdRequest: SdRequest }>()
);

export const update = createAction('[SdRequest] Update', props<{ sdRequest: SdRequest; needToGetNewData: boolean }>());
