import { createAction, props } from '@ngrx/store';

import { Service } from '../../../entities/model/service.interface';

export const setAll = createAction('[Service] Set All', props<{ services: Service[] }>());

export const loadSelected = createAction('[Service/API] Load Selected');

export const loadSelectedSuccess = createAction('[Service/API] Load Selected Success', props<{ service: Service }>());

export const loadSelectedFailure = createAction('[Service/API] Load Selected Failure', props<{ error: string }>());
