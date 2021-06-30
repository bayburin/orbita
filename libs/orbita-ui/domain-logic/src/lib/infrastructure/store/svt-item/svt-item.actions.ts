import { createAction, props } from '@ngrx/store';

import { SvtItem } from './../../../entities/models/svt/svt-item.interface';

export const loadByInventNum = createAction('[SvtItem/Api] Load All');

export const loadAllSuccess = createAction('[SvtItem/API] Load All Success', props<{ svtItems: SvtItem[] }>());

export const loadAllFailure = createAction('[SvtItem/API] Load All Failure', props<{ error: any }>());

export const loadSelected = createAction('[SvtItem/API] Load Selected');

export const loadSelectedSuccess = createAction('[SvtItem/API] Load Selected Success', props<{ svtItem: SvtItem }>());

export const loadSelectedNotFound = createAction('[SvtItem/API] Load Selected Not Found');

export const loadSelectedFailure = createAction('[SvtItem/API] Load Selected Failure', props<{ error: any }>());

export const select = createAction('[SvtItem] Select', props<{ barcode: number }>());
