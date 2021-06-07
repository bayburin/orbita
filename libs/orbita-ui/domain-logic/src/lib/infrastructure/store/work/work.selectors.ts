import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { WORK_FEATURE_KEY, State, WorkPartialState, workAdapter } from './work.reducer';

export const getWorkState = createSelector(getOrbitaUiState, (state: WorkPartialState) => state[WORK_FEATURE_KEY]);

const { selectAll, selectEntities } = workAdapter.getSelectors();

export const getLoaded = createSelector(getWorkState, (state: State) => state.loaded);

export const getAll = createSelector(getWorkState, (state: State) => selectAll(state));

export const getEntities = createSelector(getWorkState, (state: State) => selectEntities(state));
