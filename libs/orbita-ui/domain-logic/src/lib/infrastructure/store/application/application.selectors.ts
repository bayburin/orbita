import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { APPLICATION_FEATURE_KEY, State, ApplicationPartialState, applicationAdapter } from './application.reducer';

export const getApplicationState = createSelector(
  getOrbitaUiState,
  (state: ApplicationPartialState) => state[APPLICATION_FEATURE_KEY]
);

const { selectAll, selectEntities } = applicationAdapter.getSelectors();

export const getLoaded = createSelector(getApplicationState, (state: State) => state.loaded);

export const getAll = createSelector(getApplicationState, (state: State) => selectAll(state));

export const getEntities = createSelector(getApplicationState, (state: State) => selectEntities(state));
