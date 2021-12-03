import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Service } from '../../../entities/model/service.interface';

export const setEntities = createAction('[Service] Set Entities', props<{ entities: Dictionary<Service> }>());

export const loadSelected = createAction('[Service/API] Load Selected');

export const loadSelectedSuccess = createAction('[Service/API] Load Selected Success', props<{ service: Service }>());

export const loadSelectedFailure = createAction('[Service/API] Load Selected Failure', props<{ error: string }>());
