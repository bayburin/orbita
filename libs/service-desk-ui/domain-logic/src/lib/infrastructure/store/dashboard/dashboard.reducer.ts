import { createReducer, on, Action } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  loading: boolean;
  loaded: boolean;
  categoryIds: number[];
  serviceIds: number[];
  error?: string | null;
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  categoryIds: [],
  serviceIds: [],
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(DashboardActions.loadDashboardSuccess, (state, { categoryIds, serviceIds }) => ({
    ...state,
    loading: false,
    loaded: true,
    categoryIds,
    serviceIds,
  })),
  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
