import { createAction, props } from '@ngrx/store';
import { Application } from '../../../entities/models/application.interface';

export const setAll = createAction('[Application] Set All', props<{ applications: Application[] }>());
