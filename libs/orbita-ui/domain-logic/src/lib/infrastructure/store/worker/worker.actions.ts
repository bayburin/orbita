import { createAction, props } from '@ngrx/store';

import { Worker } from '../../../entities/models/worker.interface';

export const setAll = createAction('[Worker] Set All', props<{ workers: Worker[] }>());

export const setWorkers = createAction('[Worker] Set Workers', props<{ workers: Worker[] }>());

export const clearAll = createAction('[Worker] Clear All');
