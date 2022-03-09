import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { SD_SERVICE_FEATURE_KEY, State, SdServicePartialState, sdServiceAdapter } from './sd-service.reducer';

export const getSdServiceState = createSelector(
  getOrbitaUiState,
  (state: SdServicePartialState) => state[SD_SERVICE_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdServiceAdapter.getSelectors();

export const getAll = createSelector(getSdServiceState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSdServiceState, (state: State) => selectEntities(state));
