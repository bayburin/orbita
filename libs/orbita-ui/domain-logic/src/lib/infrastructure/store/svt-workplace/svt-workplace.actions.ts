import { createAction, props } from '@ngrx/store';

import { SvtWorkplace } from './../../../entities/models/svt/svt-workplace.interface';

export const setAll = createAction('[SvtWorkplace] Set All', props<{ workplaces: SvtWorkplace[] }>());

export const clearAll = createAction('[SvtWorkplace] Clear All');
