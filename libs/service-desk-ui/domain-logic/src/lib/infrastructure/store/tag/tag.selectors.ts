import { getServiceDeskUiState } from './../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TAG_FEATURE_KEY, State, tagAdapter, TagPartialState } from './tag.reducer';

export const getServiceState = createSelector(
  getServiceDeskUiState,
  (state: TagPartialState) => state[TAG_FEATURE_KEY]
);
export const getTagState = createFeatureSelector<State>(TAG_FEATURE_KEY);

const { selectAll, selectEntities } = tagAdapter.getSelectors();

export const getLoading = createSelector(getTagState, (state: State) => state.loading);

export const getLoaded = createSelector(getTagState, (state: State) => state.loaded);

export const getError = createSelector(getTagState, (state: State) => state.error);

export const getAll = createSelector(getTagState, (state: State) => selectAll(state));

export const getEntities = createSelector(getTagState, (state: State) => selectEntities(state));
