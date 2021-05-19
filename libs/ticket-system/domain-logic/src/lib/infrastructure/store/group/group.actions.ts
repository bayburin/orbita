import { createAction, props } from '@ngrx/store';

import { GroupQueue } from '../../../entities/group.interface';

export const loadAll = createAction('[Group/API] Load All');

export const loadAllSuccess = createAction(
  '[Group/API] Load All Success',
  props<{ groupQueue: GroupQueue }>()
);

export const loadAllFailure = createAction(
  '[Group/API] Load All Failure',
  props<{ error: any }>()
);
