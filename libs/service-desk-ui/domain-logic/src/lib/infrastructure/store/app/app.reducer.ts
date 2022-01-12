import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from './app.actions';

export const APP_FEATURE_KEY = 'app';

export interface State {
  loading: boolean;
  loaded: boolean;
  adBlock: boolean;
  appVersion: string;
  appHash: string;
  serverDate: string;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  adBlock: false,
  appVersion: undefined,
  appHash: '{{POST_BUILD_ENTERS_HASH_HERE}}',
  serverDate: undefined,
};

const appReducer = createReducer(
  initialState,
  on(AppActions.appInit, (state) => ({ ...state, loaded: false, loading: true })),
  on(AppActions.appInitSuccess, (state) => ({ ...state, loaded: true, loading: false })),
  on(AppActions.appInitFailure, (state) => ({ ...state, loaded: false, loading: false })),
  on(AppActions.detectAdBlock, (state, { adBlock }) => ({ ...state, adBlock })),
  on(AppActions.loadAppVersionSuccess, (state, { version }) => ({
    ...state,
    appVersion: version.version,
    appHash: version.hash,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
