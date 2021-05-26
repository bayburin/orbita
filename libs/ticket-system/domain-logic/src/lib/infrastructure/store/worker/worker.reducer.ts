import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WorkerActions from './worker.actions';
import { Worker } from '../../../entities/models/worker.interface';

export const WORKER_FEATURE_KEY = 'worker';

export interface State extends EntityState<Worker> {
  loaded: boolean;
  error?: string | null;
}

export interface WorkerPartialState {
  readonly [WORKER_FEATURE_KEY]: State;
}

export const workerAdapter: EntityAdapter<Worker> = createEntityAdapter<Worker>();

export const initialState: State = workerAdapter.getInitialState({
  loaded: false
});

const workerReducer = createReducer(
  initialState,
  on(WorkerActions.setAll, (state, { workers }) =>
    workerAdapter.setAll(workers, { ...state, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return workerReducer(state, action);
}
