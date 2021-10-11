import { createAction, props } from '@ngrx/store';

export const init = createAction('[App] Init');

export const loadAppSuccess = createAction('[App] Load App Success');

export const loadAppFailure = createAction(
  '[App] Load App Failure',
  props<{ error: any }>()
);
