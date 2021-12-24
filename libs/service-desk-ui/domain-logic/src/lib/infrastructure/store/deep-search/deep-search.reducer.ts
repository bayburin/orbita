import { createReducer, on, Action } from '@ngrx/store';

import * as DeepSearchActions from './deep-search.actions';

export const DEEP_SEARCH_FEATURE_KEY = 'deepSearch';

export interface State {
  categoryIds: number[];
  serviceIds: number[];
  questionIds: number[];
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface DeepSearchPartialState {
  readonly [DEEP_SEARCH_FEATURE_KEY]: State;
}

export const initialState: State = {
  categoryIds: [],
  serviceIds: [],
  questionIds: [],
  loading: false,
  loaded: false,
};

const deepSearchReducer = createReducer(
  initialState,
  on(DeepSearchActions.search, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    categoryIds: [],
    serviceIds: [],
    questionIds: [],
  })),
  on(DeepSearchActions.searchSuccess, (state, { categoryIds, serviceIds, questionIds }) => ({
    ...state,
    loading: false,
    loaded: true,
    categoryIds,
    serviceIds,
    questionIds,
  })),
  on(DeepSearchActions.searchFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return deepSearchReducer(state, action);
}
