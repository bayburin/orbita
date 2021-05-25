import { createAction, props } from '@ngrx/store';

import { Parameter } from '../../../entities/models/parameter.interface';

export const loadAll = createAction(
  '[Parameter/API] Load All',
  props<{ claim_id: number }>()
);

export const loadAllSuccess = createAction(
  '[Parameter/API] Load All Success',
  props<{ parameters: Parameter[] }>()
);

export const loadAllFailure = createAction(
  '[Parameter/API] Load All Failure',
  props<{ error: any }>()
);
