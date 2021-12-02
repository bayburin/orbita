import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CategoryActions from './category.actions';
import { Category } from '../../../entities/model/category.interface';

export const CATEGORY_FEATURE_KEY = 'category';

export interface State extends EntityState<Category> {
  selectedId?: number;
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface CategoryPartialState {
  readonly [CATEGORY_FEATURE_KEY]: State;
}

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = categoryAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.setAll, (state, { categories }) => categoryAdapter.setAll(categories, state)),
  on(CategoryActions.loadAll, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(CategoryActions.loadAllSuccess, (state, { entities, ids }) => ({
    ...state,
    entities,
    ids,
    loaded: true,
    loading: false,
  })),
  on(CategoryActions.loadAllFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return categoryReducer(state, action);
}
