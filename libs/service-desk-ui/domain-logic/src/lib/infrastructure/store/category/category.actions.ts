import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Category } from '../../../entities/model/category.interface';

export const setAll = createAction('[Category] Set All', props<{ categories: Category[] }>());

export const loadAll = createAction('[Category/API] Load All');

export const loadAllSuccess = createAction(
  '[Category/API] Load All Success',
  props<{ entities: Dictionary<Category>; ids: number[] }>()
);

export const loadAllFailure = createAction('[Category/API] Load All Failure', props<{ error: any }>());
