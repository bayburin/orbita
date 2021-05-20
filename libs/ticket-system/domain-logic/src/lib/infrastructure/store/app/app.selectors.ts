import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { APP_FEATURE_KEY, State, AppPartialState } from './app.reducer';

export const getAppState = createSelector(
  getTicketSystemState,
  (state: AppPartialState) => state[APP_FEATURE_KEY]
);

export const getLoaded = createSelector(
  getAppState,
  (state: State) => state.loaded
);

export const getLoading = createSelector(
  getAppState,
  (state: State) => state.loading
);

export const getError = createSelector(
  getAppState,
  (state: State) => state.error
);
