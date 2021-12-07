import { createAction, props } from '@ngrx/store';

import { SearchResult } from './../../../entities/server-data/search-result.interface';

export const search = createAction('[Search/API] Search', props<{ term: string }>());

export const searchSuccess = createAction(
  '[Search/API] Search Success',
  props<{ categoryIds: number[]; serviceIds: number[]; questionIds: number[] }>()
);

export const searchFailure = createAction('[Search/API] Search Failure', props<{ error: any }>());

export const setAll = createAction('[Search] Set All', props<{ result: SearchResult }>());

export const removeAll = createAction('[Search] Remove All');
