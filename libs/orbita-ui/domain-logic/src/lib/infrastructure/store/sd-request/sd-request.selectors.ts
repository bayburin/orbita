import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  SD_REQUEST_FEATURE_KEY,
  State,
  SdRequestPartialState,
  sdRequestAdapter,
  SelectedState,
  FormState,
  NewFormState,
} from './sd-request.reducer';

export const getSdRequestState = createSelector(
  getOrbitaUiState,
  (state: SdRequestPartialState) => state[SD_REQUEST_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

// ========== Список заявок ==========

export const getTotalCount = createSelector(getSdRequestState, (state: State) => state.totalCount);

export const getLoading = createSelector(getSdRequestState, (state: State) => state.loading);

export const getLoaded = createSelector(getSdRequestState, (state: State) => state.loaded);

export const getError = createSelector(getSdRequestState, (state: State) => state.error);

export const getAll = createSelector(getSdRequestState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSdRequestState, (state: State) => selectEntities(state));

// ========== Просмотр выбранной заявки ==========

export const getSelected = createSelector(getSdRequestState, (state: State) => state.selected);

export const getSelectedId = createSelector(getSelected, (state: SelectedState) => state.id);

export const getSelectedEntity = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedSkeleton = createSelector(getSelected, (state: SelectedState) => state.skeleton);

export const getSelectedEditMode = createSelector(getSelected, (state: SelectedState) => state.editMode);

export const getSelectedError = createSelector(getSelected, (state: SelectedState) => state.error);

// ========== Форма существующей заявки ==========

export const getForm = createSelector(getSdRequestState, (state: State) => state.form);

export const getFormEntity = createSelector(getForm, (state: FormState) => state.entity);

export const getFormLoading = createSelector(getForm, (state: FormState) => state.loading);

export const getFormUpdateView = createSelector(getForm, (state: FormState) => state.updateView);

export const getNeedToGetNewData = createSelector(getForm, (state: FormState) => state.needToGetNewData);

// ========== Форма новой заявки ==========

export const getNewForm = createSelector(getSdRequestState, (state: State) => state.newForm);

export const getNewFormEntity = createSelector(getNewForm, (state: NewFormState) => state.entity);

export const getNewFormLoading = createSelector(getNewForm, (state: NewFormState) => state.loading);

export const getNewFormCreated = createSelector(getNewForm, (state: NewFormState) => state.created);

export const getNewFormUpdateView = createSelector(getNewForm, (state: NewFormState) => state.updateView);

export const getNewFormShowModalAfterCreate = createSelector(
  getNewForm,
  (state: NewFormState) => state.showModalAfterCreate
);
