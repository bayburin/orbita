import { createAction, props } from '@ngrx/store';

export const loadHome = createAction('[Home/API] Load Home');

export const loadHomeSuccess = createAction(
  '[Home/API] Load Home Success',
  props<{ categoryIds: number[]; serviceIds: number[] }>()
);

export const loadHomeFailure = createAction('[Home/API] Load Home Failure', props<{ error: any }>());
