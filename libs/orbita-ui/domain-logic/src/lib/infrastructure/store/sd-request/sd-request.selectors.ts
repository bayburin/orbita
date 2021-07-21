import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  SD_REQUEST_FEATURE_KEY,
  State,
  SdRequestPartialState,
  sdRequestAdapter,
  SelectedState,
  FormState,
} from './sd-request.reducer';

export const getSdRequestState = createSelector(
  getOrbitaUiState,
  (state: SdRequestPartialState) => state[SD_REQUEST_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

// ========== Список заявок ==========

export const getFirstRowIndex = createSelector(getSdRequestState, (state: State) => state.firstRowIndex);

export const getTotalCount = createSelector(getSdRequestState, (state: State) => state.totalCount);

export const getSortField = createSelector(getSdRequestState, (state: State) => state.sortField);

export const getSortOrder = createSelector(getSdRequestState, (state: State) => state.sortOrder);

export const getPerPage = createSelector(getSdRequestState, (state: State) => state.perPage);

export const getFilters = createSelector(getSdRequestState, (state: State) => state.filters);

export const getLoading = createSelector(getSdRequestState, (state: State) => state.loading);

export const getLoaded = createSelector(getSdRequestState, (state: State) => state.loaded);

export const getNeedTickets = createSelector(getSdRequestState, (state: State) => state.needTickets);

// export const getNeedTicket = createSelector(getSdRequestState, (state: State) => state.needTicket);

export const getError = createSelector(getSdRequestState, (state: State) => state.error);

export const getAll = createSelector(getSdRequestState, (state: State) => selectAll(state));

export const getAllSorted = createSelector(getAll, getSortField, getSortOrder, (sdRequests, sortField, sortOrder) =>
  sdRequests.sort((a: Record<string, any>, b: Record<string, any>) =>
    a[sortField] > b[sortField] ? sortOrder : sortOrder * -1
  )
);

export const getEntities = createSelector(getSdRequestState, (state: State) => selectEntities(state));

export const getPage = createSelector(
  getFirstRowIndex,
  getPerPage,
  (firstRowIndex, perPage) => firstRowIndex / perPage + 1
);

// ========== Просмотр выбранной заявки ==========

export const getSelected = createSelector(getSdRequestState, (state: State) => state.selected);

export const getSelectedEntity = createSelector(getSelected, (state: SelectedState) => state.entity);

export const getSelectedSkeleton = createSelector(getSelected, (state: SelectedState) => state.skeleton);

export const getSelectedEditMode = createSelector(getSelected, (state: SelectedState) => state.editMode);

export const getSelectedError = createSelector(getSelected, (state: SelectedState) => state.error);

// ========== Форма заявки ==========

export const getForm = createSelector(getSdRequestState, (state: State) => state.form);

export const getFormEntity = createSelector(getForm, (state: FormState) => state.entity);

export const getFormLoading = createSelector(getForm, (state: FormState) => state.loading);

export const getFormUpdateView = createSelector(getForm, (state: FormState) => state.updateView);
