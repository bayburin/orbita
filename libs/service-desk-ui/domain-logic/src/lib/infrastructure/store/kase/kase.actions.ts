import { createAction, props } from '@ngrx/store';

import { Filter } from '../../../entities/filter.interface';
import { Kase } from '../../../entities/models/kase.interface';
import { SvtItem } from '../../../entities/models/svt/svt-item.interface';
import { KaseViewForm } from './../../../entities/form/kase-view-form.interface';

// ========== Список заявок ==========

export const init = createAction('[Kase] Init');

export const loadAll = createAction('[Kase/API] Load All');

export const loadAllSuccess = createAction('[Kase/API] Load All Success', props<{ kases: Kase[] }>());

export const loadAllFailure = createAction('[Kase/API] Load All Failure', props<{ error: any }>());

export const setStatuses = createAction('[Kase] Set Statuses', props<{ statuses: Filter[] }>());

export const setServiceIds = createAction('[Kase] Set Service Ids', props<{ serviceIds: number[] }>());

export const revoke = createAction('[Kase/API] Revoke Kase', props<{ caseId: number }>());

export const revokeSuccess = createAction('[Kase/API] Revoke Kase Success');

export const revokeFailure = createAction('[Kase/API] Revoke Kase Failure', props<{ error: any }>());

export const setSelectedStatusId = createAction('[Kase] Set SelectedStatusId', props<{ selectedStatusId: number }>());

export const vote = createAction('[Kase/API] Vote Kase Rating', props<{ caseId: number; rating: number }>());

export const voteSuccess = createAction('[Kase/API] Vote Kase Success');

export const voteFailure = createAction('[Kase/API] Vote Kase Rating Failure', props<{ error: any }>());

// ========== Форма новой заявки ==========

export const initNewForm = createAction('[Kase] Init New Form');

export const loadParamsForNewForm = createAction('[Kase/API] Load Data For New Form');

export const loadParamsForNewFormSuccess = createAction('[Kase/API] Load Params For New Form Success');

export const loadParamsForNewFormFailure = createAction(
  '[Kase/API] Load Params For New Form Failure',
  props<{ error: any }>()
);

export const setInitialDataToNewForm = createAction(
  '[Kase] Set Initial Data To New Form',
  props<{ formData: KaseViewForm }>()
);

export const setSvtItems = createAction('[Kase] Set SvtItems', props<{ svtItems: SvtItem[] }>());

export const changeForm = createAction('[Kase] Change Form', props<{ formData: KaseViewForm }>());

export const saveForm = createAction('[Kase/API] Save Form');

export const saveFormSuccess = createAction('[Kase/API] Save Form Success');

export const saveFormFailure = createAction('[Kase/API] Save Form Failure', props<{ error: any }>());
