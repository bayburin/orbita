import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { HOST_FEATURE_KEY, State, HostPartialState, hostAdapter } from './host.reducer';

export const getHostState = createSelector(getOrbitaUiState, (state: HostPartialState) => state[HOST_FEATURE_KEY]);

const { selectAll, selectEntities } = hostAdapter.getSelectors();

export const getLoading = createSelector(getHostState, (state: State) => state.loading);

export const getLoaded = createSelector(getHostState, (state: State) => state.loaded);

export const getError = createSelector(getHostState, (state: State) => state.error);

export const getAll = createSelector(getHostState, (state: State) => selectAll(state));

export const getEntities = createSelector(getHostState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getHostState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
