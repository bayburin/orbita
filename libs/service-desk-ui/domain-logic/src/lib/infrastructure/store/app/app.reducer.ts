import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from './app.actions';

export const APP_FEATURE_KEY = 'app';

export interface State {
  loading: boolean;
  loaded: boolean;
  adBlock: boolean;
  currentVersion: string;
  serverDate: string;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  adBlock: false,
  currentVersion: undefined,
  serverDate: undefined,
};

const appReducer = createReducer(
  initialState,
  on(AppActions.init, (state) => ({ ...state, loaded: false, loading: true })),
  on(AppActions.loadAppSuccess, (state) => ({ ...state, loaded: true, loading: false })),
  on(AppActions.loadAppFailure, (state) => ({ ...state, loaded: false, loading: false })),
  on(AppActions.detectAdBlock, (state, { adBlock }) => ({ ...state, adBlock }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
