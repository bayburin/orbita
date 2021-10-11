import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { GROUP_FEATURE_KEY, State, GroupPartialState, groupAdapter } from './group.reducer';

export const getGroupState = createSelector(getOrbitaUiState, (state: GroupPartialState) => state[GROUP_FEATURE_KEY]);

const { selectAll, selectEntities } = groupAdapter.getSelectors();

export const getLoaded = createSelector(getGroupState, (state: State) => state.loaded);

export const getAll = createSelector(getGroupState, (state: State) => selectAll(state));

export const getEntities = createSelector(getGroupState, (state: State) => selectEntities(state));
