import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  SD_REQUEST_FEATURE_KEY,
  State,
  SdRequestPartialState,
  sdRequestAdapter,
} from './sd-request.reducer';
// import { getLastHistory } from '../../utils/get-last-history.function';

export const getSdRequestState = createSelector(
  getOrbitaUiState,
  (state: SdRequestPartialState) => state[SD_REQUEST_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

export const getFirstRowIndex = createSelector(
  getSdRequestState,
  (state: State) => state.firstRowIndex
);

export const getTotalCount = createSelector(
  getSdRequestState,
  (state: State) => state.totalCount
);

export const getPerPage = createSelector(
  getSdRequestState,
  (state: State) => state.perPage
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

export const getPage = createSelector(
  getFirstRowIndex,
  getPerPage,
  (firstRowIndex, perPage) => firstRowIndex / perPage + 1
)

// TODO: Исправить или удалить
// export const getLastHistories = createSelector(
//   getEntities,
//   (entities) => Object.keys(entities).map(id => ({ [id]: getLastHistory(entities[id]) }))
// )
