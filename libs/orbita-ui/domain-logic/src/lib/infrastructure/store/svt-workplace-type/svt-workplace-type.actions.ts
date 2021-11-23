import { createAction, props } from '@ngrx/store';

import { SvtWorkplaceType } from './../../../entities/models/svt/svt-workplace-type.interface';

export const setAll = createAction('[SvtWorkplaceType] Set All', props<{ wpTypes: SvtWorkplaceType[] }>());

export const clearAll = createAction('[SvtWorkplaceType] Clear All');
