import { createAction, props } from '@ngrx/store';

import { SvtType } from './../../../entities/models/svt/svt-type.interface';

export const setAll = createAction('[SvtType] Set All', props<{ svtTypes: SvtType[] }>());

export const clearAll = createAction('[SvtType] Clear All');
