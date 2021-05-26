import { createAction, props } from '@ngrx/store';

import { Group } from '../../../entities/models/group.interface';

export const setAll = createAction(
  '[Group] Set All',
  props<{ groups: Group[] }>()
);
