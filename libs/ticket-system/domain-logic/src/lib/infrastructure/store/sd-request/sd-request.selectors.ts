import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { SD_REQUEST_FEATURE_KEY, State, SdRequestPartialState, sdRequestAdapter } from './sd-request.reducer';

export const getSdRequestState = createSelector(
  getTicketSystemState,
  (state: SdRequestPartialState) => state[SD_REQUEST_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

export const getPage = createSelector(
  getSdRequestState,
  (state: State) => state.page
);

export const getTotalPages = createSelector(
  getSdRequestState,
  (state: State) => state.totalPages
);

export const getTotalCount = createSelector(
  getSdRequestState,
  (state: State) => state.totalCount
);

export const getMaxSize = createSelector(
  getSdRequestState,
  (state: State) => state.maxSize
);

export const getSelectedId = createSelector(
  getSdRequestState,
  (state: State) => state.selectedId
);

export const getLoading = createSelector(
  getSdRequestState,
  (state: State) => state.loading
);

export const getLoaded = createSelector(
  getSdRequestState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getSdRequestState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getSdRequestState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getSdRequestState,
  (state: State) => selectEntities(state)
);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
