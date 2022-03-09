import { createAction, props } from '@ngrx/store';

import { SvtWorkplaceCount } from './../../../entities/models/svt/svt-workplace-count.interface';

export const setAll = createAction('[SvtWorkplaceCount] Set All', props<{ wpCounts: SvtWorkplaceCount[] }>());

export const clearAll = createAction('[SvtWorkplaceCount] Clear All');
