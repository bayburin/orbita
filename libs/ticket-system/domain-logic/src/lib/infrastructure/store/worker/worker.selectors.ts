import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { WORKER_FEATURE_KEY, State, WorkerPartialState, workerAdapter } from './worker.reducer';

export const getWorkerState = createSelector(
  getTicketSystemState,
  (state: WorkerPartialState) => state[WORKER_FEATURE_KEY]
);

const { selectAll, selectEntities } = workerAdapter.getSelectors();

export const getLoaded = createSelector(
  getWorkerState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getWorkerState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getWorkerState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getWorkerState,
  (state: State) => selectEntities(state)
);
