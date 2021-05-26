import { createAction, props } from '@ngrx/store';

import { User } from '../../../entities/models/user.interface';

export const setAll = createAction(
  '[User] Set All',
  props<{ users: User[] }>()
);
