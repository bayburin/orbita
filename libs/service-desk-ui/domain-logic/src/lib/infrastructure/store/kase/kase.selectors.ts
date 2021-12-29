import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { KASE_FEATURE_KEY, State, kaseAdapter, KasePartialState, FormState } from './kase.reducer';

export const getKaseState = createSelector(getServiceDeskUiState, (state: KasePartialState) => state[KASE_FEATURE_KEY]);

const { selectAll, selectEntities } = kaseAdapter.getSelectors();

// ========== Список заявок ==========

export const getLoaded = createSelector(getKaseState, (state: State) => state.loaded);

export const getLoading = createSelector(getKaseState, (state: State) => state.loading);

export const getInitLoading = createSelector(getKaseState, (state: State) => state.initLoading);

export const getError = createSelector(getKaseState, (state: State) => state.error);

export const getAll = createSelector(getKaseState, (state: State) => selectAll(state));

export const getEntities = createSelector(getKaseState, (state: State) => selectEntities(state));

export const getStatuses = createSelector(getKaseState, (state: State) => state.statuses);

export const getServiceIds = createSelector(getKaseState, (state: State) => state.serviceIds);

export const getSelectedStatusId = createSelector(getKaseState, (state: State) => state.selectedStatusId);

export const getIsAnyKase = createSelector(getStatuses, (statuses) => statuses.some((status) => status.count > 0));

// ========== Форма новой заявки ==========

export const getForm = createSelector(getKaseState, (state: State) => state.form);

export const getFormEntity = createSelector(getForm, (state: FormState) => state.entity);

export const getFormLoading = createSelector(getForm, (state: FormState) => state.loading);

export const getFormLoaded = createSelector(getForm, (state: FormState) => state.loaded);

export const getFormError = createSelector(getForm, (state: FormState) => state.error);

export const getFormSvtItems = createSelector(getForm, (state: FormState) => state.svtItems);
