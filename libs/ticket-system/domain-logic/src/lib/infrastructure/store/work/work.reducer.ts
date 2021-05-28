import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WorkActions from './work.actions';
import { Work } from '../../../entities/models/work.interface';

export const WORK_FEATURE_KEY = 'work';

export interface State extends EntityState<Work> {
  loaded: boolean
}

export interface WorkPartialState {
  readonly [WORK_FEATURE_KEY]: State;
}

export const workAdapter: EntityAdapter<Work> = createEntityAdapter<Work>();

export const initialState: State = workAdapter.getInitialState({
  loaded: false,
});

const workReducer = createReducer(
  initialState,
  on(WorkActions.setAll, (state, { works }) =>
    workAdapter.setAll(works, { ...state, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return workReducer(state, action);
}
