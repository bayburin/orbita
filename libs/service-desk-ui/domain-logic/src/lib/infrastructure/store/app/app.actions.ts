import { createAction, props } from '@ngrx/store';

import { Init } from './../../../entities/server-data/init.interface';
import { AppVersion } from './../../../entities/server-data/app-version.interface';

export const appInit = createAction('[App/API] App Init');

export const appInitSuccess = createAction('[App/API] App Init Success', props<{ init: Init }>());

export const appInitFailure = createAction('[App/API] App Init Failure', props<{ error: any }>());

export const detectAdBlock = createAction('[App] Detect AdBlock', props<{ adBlock: boolean }>());

export const loadAppVersion = createAction('[App/API] Load App Version');

export const loadAppVersionSuccess = createAction(
  '[App/API] Load App Version Success',
  props<{ version: AppVersion }>()
);

export const loadAppVersionFailure = createAction('[App/API] Load App Version Failure');
