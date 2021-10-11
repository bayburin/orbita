import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  WORKER_FEATURE_KEY,
  State,
  WorkerPartialState,
  workerAdapter,
} from './worker.reducer';

export const getWorkerState = createSelector(
  getOrbitaUiState,
  (state: WorkerPartialState) => state[WORKER_FEATURE_KEY]
);

const { selectAll, selectEntities } = workerAdapter.getSelectors();

export const getLoaded = createSelector(
  getWorkerState,
  (state: State) => state.loaded
);

export const getAll = createSelector(getWorkerState, (state: State) =>
  selectAll(state)
);

export const getEntities = createSelector(getWorkerState, (state: State) =>
  selectEntities(state)
);
