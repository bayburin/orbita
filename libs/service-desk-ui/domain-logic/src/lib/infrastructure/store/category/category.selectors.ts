import { createSelector } from '@ngrx/store';

import { CATEGORY_FEATURE_KEY, State, categoryAdapter, CategoryPartialState, FormState } from './category.reducer';
import { getServiceDeskUiState } from './../index';

export const getCategoryState = createSelector(
  getServiceDeskUiState,
  (state: CategoryPartialState) => state[CATEGORY_FEATURE_KEY]
);

const { selectAll, selectEntities } = categoryAdapter.getSelectors();

export const getIds = createSelector(getCategoryState, (state: State): number[] => state.ids as number[]);

export const getLoaded = createSelector(getCategoryState, (state: State) => state.loaded);

export const getLoading = createSelector(getCategoryState, (state: State) => state.loading);

export const getError = createSelector(getCategoryState, (state: State) => state.error);

export const getAll = createSelector(getCategoryState, (state: State) => selectAll(state));

export const getEntities = createSelector(getCategoryState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getCategoryState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

// ========== Форма рекомендаций для пользователя ==========

export const getForm = createSelector(getCategoryState, (state: State) => state.form);

export const getFormData = createSelector(getForm, (state: FormState) => state.formData);

export const getFormLoading = createSelector(getForm, (state: FormState) => state.loading);

export const getFormDisplayForm = createSelector(getForm, (state: FormState) => state.displayForm);

export const getFormError = createSelector(getForm, (state: FormState) => state.error);
