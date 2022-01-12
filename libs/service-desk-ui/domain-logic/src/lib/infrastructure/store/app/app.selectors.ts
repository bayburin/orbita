import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { AppPartialState, APP_FEATURE_KEY, State } from './app.reducer';

export const getAppState = createSelector(getServiceDeskUiState, (state: AppPartialState) => state[APP_FEATURE_KEY]);

export const getAppHash = createSelector(getAppState, (state: State) => state.appHash);

export const getAppVersion = createSelector(getAppState, (state: State) => state.appVersion);
