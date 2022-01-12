import { createAction, props } from '@ngrx/store';

export const init = createAction('[App/API] Init');

export const loadAppSuccess = createAction('[App/API] Load App Success');

export const loadAppFailure = createAction('[App/API] Load App Failure');

export const detectAdBlock = createAction('[App] Detect AdBlock', props<{ adBlock: boolean }>());
