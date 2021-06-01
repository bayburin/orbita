import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as HistoryActions from './history.actions';
import { History } from '../../../entities/models/history.interface';

export const HISTORY_FEATURE_KEY = 'history';

export interface State extends EntityState<History> {
  loaded: boolean;
}

export interface HistoryPartialState {
  readonly [HISTORY_FEATURE_KEY]: State;
}

export const historyAdapter: EntityAdapter<History> = createEntityAdapter<History>();

export const initialState: State = historyAdapter.getInitialState({
  loaded: false,
});

const historyReducer = createReducer(
  initialState,
  on(HistoryActions.setAll, (state, { histories }) =>
    historyAdapter.setAll(histories, { ...state, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return historyReducer(state, action);
}
