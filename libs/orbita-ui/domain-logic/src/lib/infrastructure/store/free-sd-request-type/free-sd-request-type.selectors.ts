import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  FREE_SD_REQUEST_TYPE_FEATURE_KEY,
  State,
  FreeSdRequestTypePartialState,
  freeSdRequestTypeAdapter,
} from './free-sd-request-type.reducer';

export const getFreeSdRequestTypeState = createSelector(
  getOrbitaUiState,
  (state: FreeSdRequestTypePartialState) =>
    state[FREE_SD_REQUEST_TYPE_FEATURE_KEY]
);

const { selectAll, selectEntities } = freeSdRequestTypeAdapter.getSelectors();

export const getLoaded = createSelector(
  getFreeSdRequestTypeState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getFreeSdRequestTypeState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getFreeSdRequestTypeState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getFreeSdRequestTypeState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFreeSdRequestTypeState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
