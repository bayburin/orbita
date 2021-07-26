import { createAction, props } from '@ngrx/store';

import { History } from '../../../entities/models/history.interface';

export const setAll = createAction('[History] Set All', props<{ histories: History[] }>());

export const setHistories = createAction('[History] Set Histories', props<{ histories: History[] }>());

export const clearAll = createAction('[History] Clear All');
