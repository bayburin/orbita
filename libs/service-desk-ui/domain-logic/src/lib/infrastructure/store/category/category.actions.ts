import { createAction, props } from '@ngrx/store';
import { Category } from '../../../entities/model/category.interface';

export const loadAll = createAction('[Category/API] Load All');

export const loadAllSuccess = createAction('[Category/API] Load All Success', props<{ categories: Category[] }>());

export const loadAllFailure = createAction('[Category/API] Load All Failure', props<{ error: any }>());
