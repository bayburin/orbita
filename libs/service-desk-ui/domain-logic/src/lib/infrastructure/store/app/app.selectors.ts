import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { AppPartialState, APP_FEATURE_KEY, State } from './app.reducer';

export const getAttachmentState = createSelector(
  getServiceDeskUiState,
  (state: AppPartialState) => state[APP_FEATURE_KEY]
);
