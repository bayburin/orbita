import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CATEGORY_FEATURE_KEY, State, categoryAdapter } from './category.reducer';

export const getState = createFeatureSelector<State>(CATEGORY_FEATURE_KEY);

const { selectAll, selectEntities } = categoryAdapter.getSelectors();

export const getLoaded = createSelector(getState, (state: State) => state.loaded);

export const getLoading = createSelector(getState, (state: State) => state.loading);

export const getError = createSelector(getState, (state: State) => state.error);

export const getAll = createSelector(getState, (state: State) => selectAll(state));

export const getEntities = createSelector(getState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getState, (state: State) => state.selectedId);

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
