import { createAction, props } from '@ngrx/store';

import { UserQueue } from '../../../entities/user-queue.interface';

export const loadAll = createAction('[User/Api] loadAll');

export const loadAllSuccess = createAction(
  '[User/API] Load All Success',
  props<{ userQueue: UserQueue }>()
);

export const loadAllFailure = createAction(
  '[User/API] Load All Failure',
  props<{ error: any }>()
);
