import { createAction, props } from '@ngrx/store';

import { DeepSearchFilterTypes } from './../../../entities/filter.interface';

export const search = createAction('[DeepSearch/API] Search');

export const searchSuccess = createAction(
  '[DeepSearch/API] Search Success',
  props<{ categoryIds: number[]; serviceIds: number[]; questionIds: number[] }>()
);

export const searchFailure = createAction('[DeepSearch/API] Search Failure', props<{ error: any }>());

export const setSelectedResultTypeId = createAction(
  '[Kase] Set SelectedResultTypeId',
  props<{ selectedResultTypeId: DeepSearchFilterTypes }>()
);