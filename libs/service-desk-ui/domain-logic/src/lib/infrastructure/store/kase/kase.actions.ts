import { createAction, props } from '@ngrx/store';

import { KaseStatus } from '../../../entities/model/kase-status.interface';
import { Kase } from './../../../entities/model/kase.interface';

export const init = createAction('[Kase] Init');

export const loadAll = createAction('[Kase/API] Load All');

export const loadAllSuccess = createAction('[Kase/API] Load All Success', props<{ kases: Kase[] }>());

export const loadAllFailure = createAction('[Kase/API] Load All Failure', props<{ error: any }>());

export const setStatuses = createAction('[Kase] Set Statuses', props<{ statuses: KaseStatus[] }>());

export const setServiceIds = createAction('[Kase] Set Service Ids', props<{ serviceIds: number[] }>());

export const revoke = createAction('[Kase/API] Revoke Kase', props<{ caseId: number }>());

export const revokeSuccess = createAction('[Kase/API] Revoke Kase Success');

export const revokeFailure = createAction('[Kase/API] Revoke Kase Failure', props<{ error: any }>());

export const setSelectedStatusId = createAction('[Kase] Set SelectedStatusId', props<{ selectedStatusId: number }>());
