import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as HostActions from './host.actions';
import { Host } from './../../../entities/models/host.interface';

export const HOST_FEATURE_KEY = 'host';

export interface State extends EntityState<Host> {
  loading: boolean;
  loaded: boolean;
  selectedId: string;
  error: string;
}

export interface HostPartialState {
  readonly [HOST_FEATURE_KEY]: State;
}

export const hostAdapter: EntityAdapter<Host> = createEntityAdapter<Host>();

export const initialState: State = hostAdapter.getInitialState({
  loading: false,
  loaded: false,
  selectedId: null,
  error: null,
});

const hostReducer = createReducer(
  initialState,
  on(HostActions.loadForEmployee, HostActions.loadSelected, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(HostActions.loadForEmployeeSuccess, (state, { hosts }) =>
    hostAdapter.setAll(hosts, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(HostActions.loadSelectedSuccess, (state, { host }) =>
    hostAdapter.setOne(host, { ...state, loading: false, loaded: true })
  ),
  on(HostActions.loadSelectedNotFound, (state) => ({ ...state, loading: false, loaded: false })),
  on(HostActions.loadForEmployeeFailure, HostActions.loadSelectedFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(HostActions.select, (state, { inventNum }) => ({
    ...state,
    selectedId: inventNum ? inventNum.toLowerCase() : null,
  })),
  on(HostActions.clearSelected, (state) => ({ ...state, selectedId: null, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return hostReducer(state, action);
}
