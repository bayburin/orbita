import { createAction, props } from '@ngrx/store';

import { User } from '../../../entities/models/user.interface';

export const loadAll = createAction('[User/Api] loadAll');

export const loadAllSuccess = createAction(
  '[User/API] Load All Success',
  props<{ users: User[] }>()
);

export const loadAllFailure = createAction(
  '[User/API] Load All Failure',
  props<{ error: any }>()
);
