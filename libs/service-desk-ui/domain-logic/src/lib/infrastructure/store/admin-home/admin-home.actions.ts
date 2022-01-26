import { createAction, props } from '@ngrx/store';

export const loadHome = createAction('[AdminHome/API] Load Home');

export const loadHomeSuccess = createAction('[AdminHome/API] Load Home Success');

export const loadHomeFailure = createAction('[AdminHome/API] Load Home Failure', props<{ error: any }>());
