import { createAction, props } from '@ngrx/store';

import { SvtItem } from './../../../entities/models/svt/svt-item.interface';
import { SvtFilters } from './../../../entities/filter.interface';

export const loadAll = createAction('[SvtItem/Api] Load All');

export const loadAllSuccess = createAction('[SvtItem/API] Load All Success', props<{ svtItems: SvtItem[] }>());

export const loadAllFailure = createAction('[SvtItem/API] Load All Failure', props<{ error: any }>());

export const loadSelected = createAction('[SvtItem/API] Load Selected');

export const loadSelectedSuccess = createAction('[SvtItem/API] Load Selected Success', props<{ svtItem: SvtItem }>());

export const loadSelectedNotFound = createAction('[SvtItem/API] Load Selected Not Found');

export const loadSelectedFailure = createAction('[SvtItem/API] Load Selected Failure', props<{ error: any }>());

export const select = createAction('[SvtItem] Select', props<{ barcode: number }>());

export const clearSelected = createAction('[SvtItem] Clear Selected');

export const loadAllForForm = createAction('[SvtItem/Api] Load All For Form');

export const loadAllForFormSuccess = createAction(
  '[SvtItem/API] Load All For Form Success',
  props<{ svtItems: SvtItem[] }>()
);

export const loadAllForFormFailure = createAction('[SvtItem/API] Load All For Form Failure', props<{ error: any }>());

export const setFormFilters = createAction('[SvtItem] Set Form Filters', props<{ filters: SvtFilters }>());

export const clearAll = createAction('[SvtItem] Clear All');
