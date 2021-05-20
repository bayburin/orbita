import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from './app.actions';

export const APP_FEATURE_KEY = 'app';

export interface State {
  loaded: boolean;
  loading: boolean;
  error?: string | null;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false,
  loading: false
};

const appReducer = createReducer(
  initialState,
  on(AppActions.init, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null
  })),
  on(AppActions.loadAppSuccess, (state) => ({
    ...state,
    loaded: true,
    loading: false
  })),
  on(AppActions.loadAppFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
