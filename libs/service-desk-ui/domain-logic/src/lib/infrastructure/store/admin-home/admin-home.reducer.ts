import { createReducer, on, Action } from '@ngrx/store';

import * as AdminHomeActions from './admin-home.actions';

export const ADMIN_HOME_FEATURE_KEY = 'adminHome';

export interface State {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface AdminHomePartialState {
  readonly [ADMIN_HOME_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  loaded: false,
};

const adminHomeReducer = createReducer(
  initialState,
  on(AdminHomeActions.loadHome, (state) => ({ ...state, loading: true, loaded: false, error: null })),
  on(AdminHomeActions.loadHomeSuccess, (state) => ({ ...state, loading: false, loaded: true })),
  on(AdminHomeActions.loadHomeFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return adminHomeReducer(state, action);
}
