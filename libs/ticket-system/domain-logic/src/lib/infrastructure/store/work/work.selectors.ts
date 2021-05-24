import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { WORK_FEATURE_KEY, State, WorkPartialState, workAdapter } from './work.reducer';

export const getWorkState = createSelector(
  getTicketSystemState,
  (state: WorkPartialState) => state[WORK_FEATURE_KEY]
);

const { selectAll, selectEntities } = workAdapter.getSelectors();

export const getLoaded = createSelector(
  getWorkState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getWorkState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getWorkState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getWorkState,
  (state: State) => selectEntities(state)
);
