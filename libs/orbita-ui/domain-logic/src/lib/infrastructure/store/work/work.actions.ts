import { createAction, props } from '@ngrx/store';

import { Work } from './../../../entities/models/work.interface';

export const setAll = createAction('[Work] Set All', props<{ works: Work[] }>());

export const setWorks = createAction('[Work] Set Works', props<{ works: Work[] }>());
