import { createAction, props } from '@ngrx/store';

import { Host } from './../../../entities/models/host.interface';

export const loadSelected = createAction('[Host/API] Load Selected');

export const loadSelectedSuccess = createAction('[Host/API] Load Selected Success', props<{ host: Host }>());

export const loadSelectedNotFound = createAction('[Host/API] Load Selected Not Found');

export const loadSelectedFailure = createAction('[Host/API] Load Selected Failure', props<{ error: any }>());

export const select = createAction('[Host] Select', props<{ inventNum: string }>());

export const clearSelected = createAction('[Host] Clear Selected');
