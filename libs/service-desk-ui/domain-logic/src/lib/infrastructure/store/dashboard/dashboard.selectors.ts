import { createSelector } from '@ngrx/store';

import { DASHBOARD_FEATURE_KEY, State, DashboardPartialState } from './dashboard.reducer';
import { getServiceDeskUiState } from './../index';

export const getDashboardState = createSelector(
  getServiceDeskUiState,
  (state: DashboardPartialState) => state[DASHBOARD_FEATURE_KEY]
);

export const getLoadingDashboard = createSelector(getDashboardState, (state: State) => state.loadingDashboard);

export const getLoadedDashboard = createSelector(getDashboardState, (state: State) => state.loadedDashboard);

export const getError = createSelector(getDashboardState, (state: State) => state.error);
