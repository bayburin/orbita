import { createAction, props } from '@ngrx/store';

export const search = createAction('[DeepSearch/API] Search');

export const searchSuccess = createAction(
  '[DeepSearch/API] Search Success',
  props<{ categoryIds: number[]; serviceIds: number[]; questionIds: number[] }>()
);

export const searchFailure = createAction('[DeepSearch/API] Search Failure', props<{ error: any }>());
