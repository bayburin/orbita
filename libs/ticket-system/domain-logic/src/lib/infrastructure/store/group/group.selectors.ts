import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { GROUP_FEATURE_KEY, State, GroupPartialState, groupAdapter } from './group.reducer';

export const getGroupState = createSelector(
  getTicketSystemState,
  (state: GroupPartialState) => state[GROUP_FEATURE_KEY]
);

const { selectAll, selectEntities } = groupAdapter.getSelectors();

export const getLoaded = createSelector(
  getGroupState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getGroupState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getGroupState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getGroupState,
  (state: State) => selectEntities(state)
);
