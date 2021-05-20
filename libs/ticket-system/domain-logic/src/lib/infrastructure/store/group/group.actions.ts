import { createAction, props } from '@ngrx/store';

import { Group } from '../../../entities/models/group.interface';

export const loadAllSuccess = createAction(
  '[Group/API] Load All Success',
  props<{ groups: Group[] }>()
);
