import { FilterMetadata } from 'primeng/api';
import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { SD_REQUEST_FEATURE_KEY, State, SdRequestPartialState, sdRequestAdapter } from './sd-request.reducer';
// import { getLastHistory } from '../../utils/get-last-history.function';

export const getSdRequestState = createSelector(
  getOrbitaUiState,
  (state: SdRequestPartialState) => state[SD_REQUEST_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

export const getFirstRowIndex = createSelector(getSdRequestState, (state: State) => state.firstRowIndex);

export const getTotalCount = createSelector(getSdRequestState, (state: State) => state.totalCount);

export const getSortField = createSelector(getSdRequestState, (state: State) => state.sortField);

export const getSortOrder = createSelector(getSdRequestState, (state: State) => state.sortOrder);

export const getPerPage = createSelector(getSdRequestState, (state: State) => state.perPage);

export const getFilters = createSelector(getSdRequestState, (state: State) => state.filters);

export const getSelectedId = createSelector(getSdRequestState, (state: State) => state.selectedId);

export const getLoading = createSelector(getSdRequestState, (state: State) => state.loading);

export const getLoaded = createSelector(getSdRequestState, (state: State) => state.loaded);

export const getNeedTickets = createSelector(getSdRequestState, (state: State) => state.needTickets);

export const getError = createSelector(getSdRequestState, (state: State) => state.error);

export const getAll = createSelector(getSdRequestState, (state: State) => selectAll(state));

export const getAllSorted = createSelector(getAll, getSortField, getSortOrder, (sdRequests, sortField, sortOrder) =>
  sdRequests.sort((a: Record<string, any>, b: Record<string, any>) =>
    a[sortField] > b[sortField] ? sortOrder : sortOrder * -1
  )
);

export const getEntities = createSelector(getSdRequestState, (state: State) => selectEntities(state));

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getPage = createSelector(
  getFirstRowIndex,
  getPerPage,
  (firstRowIndex, perPage) => firstRowIndex / perPage + 1
);

// export const getProcessedFilters = createSelector(getFilters, (filters) => {
//   let created_at: FilterMetadata;
//   if (filters.created_at && filters.created_at.value) {
//     created_at = {
//       value: new Date(filters.created_at.value),
//       matchMode: 'equals',
//     };
//   }
//   return {
//     ...filters,
//     created_at,
//   };
// });
