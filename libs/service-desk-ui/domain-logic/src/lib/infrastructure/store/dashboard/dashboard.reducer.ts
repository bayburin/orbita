import { createReducer, on, Action } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  loadingDashboard: boolean;
  loadedDashboard: boolean;
  error?: string | null;
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const initialState: State = {
  loadingDashboard: false,
  loadedDashboard: false,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    loadingDashboard: true,
    loadedDashboard: false,
    error: null,
  })),
  on(DashboardActions.loadDashboardSuccess, (state) => ({ ...state, loadingDashboard: false, loadedDashboard: true })),
  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({ ...state, loadingDashboard: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
