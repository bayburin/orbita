import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { HISTORY_FEATURE_KEY, State, HistoryPartialState, historyAdapter } from './history.reducer';

export const getHistoryState = createSelector(
  getOrbitaUiState,
  (state: HistoryPartialState) => state[HISTORY_FEATURE_KEY]
);

const { selectAll, selectEntities } = historyAdapter.getSelectors();

export const getLoaded = createSelector(getHistoryState, (state: State) => state.loaded);

export const getAll = createSelector(getHistoryState, (state: State) => selectAll(state));

export const getEntities = createSelector(getHistoryState, (state: State) => selectEntities(state));

export const getLastHistory = (id: number) => createSelector(getEntities, (entities) => entities && entities[id]);
