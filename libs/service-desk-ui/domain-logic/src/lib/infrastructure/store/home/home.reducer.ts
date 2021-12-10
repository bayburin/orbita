import { createReducer, on, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';

export const HOME_FEATURE_KEY = 'home';

export interface State {
  loading: boolean;
  loaded: boolean;
  categoryIds: number[];
  serviceIds: number[];
  error?: string | null;
}

export interface HomePartialState {
  readonly [HOME_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  categoryIds: [],
  serviceIds: [],
};

const homeReducer = createReducer(
  initialState,
  on(HomeActions.loadHome, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(HomeActions.loadHomeSuccess, (state, { categoryIds, serviceIds }) => ({
    ...state,
    loading: false,
    loaded: true,
    categoryIds,
    serviceIds,
  })),
  on(HomeActions.loadHomeFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return homeReducer(state, action);
}
