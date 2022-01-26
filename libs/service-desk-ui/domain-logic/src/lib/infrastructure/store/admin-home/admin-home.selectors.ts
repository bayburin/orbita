import { createSelector } from '@ngrx/store';

import { ADMIN_HOME_FEATURE_KEY, State, AdminHomePartialState } from './admin-home.reducer';
import { getServiceDeskUiState } from '../index';

export const getHomeState = createSelector(
  getServiceDeskUiState,
  (state: AdminHomePartialState) => state[ADMIN_HOME_FEATURE_KEY]
);

export const getLoading = createSelector(getHomeState, (state: State) => state.loading);

export const getLoaded = createSelector(getHomeState, (state: State) => state.loaded);

export const getError = createSelector(getHomeState, (state: State) => state.error);
