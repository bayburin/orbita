import { createSelector } from '@ngrx/store';

import {
  USER_RECOMMENDATION_FEATURE_KEY,
  State,
  userRecommendationAdapter,
  UserRecommendationPartialState,
  FormState,
} from './user-recommendation.reducer';
import { getServiceDeskUiState } from './../index';

export const getUserRecommendationState = createSelector(
  getServiceDeskUiState,
  (state: UserRecommendationPartialState) => state[USER_RECOMMENDATION_FEATURE_KEY]
);

const { selectAll, selectEntities } = userRecommendationAdapter.getSelectors();

export const getLoaded = createSelector(getUserRecommendationState, (state: State) => state.loaded);

export const getLoading = createSelector(getUserRecommendationState, (state: State) => state.loading);

export const getError = createSelector(getUserRecommendationState, (state: State) => state.error);

export const getSelectedId = createSelector(getUserRecommendationState, (state: State) => state.selectedId);

export const getLoadingIds = createSelector(getUserRecommendationState, (state: State) => state.loadingIds);

export const getAll = createSelector(getUserRecommendationState, (state: State) => selectAll(state));

export const getEntities = createSelector(getUserRecommendationState, (state: State) => selectEntities(state));

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

// ========== Форма рекомендаций для пользователя ==========

export const getForm = createSelector(getUserRecommendationState, (state: State) => state.form);

export const getFormData = createSelector(getForm, (state: FormState) => state.formData);

export const getFormLoading = createSelector(getForm, (state: FormState) => state.loading);

export const getFormDisplayForm = createSelector(getForm, (state: FormState) => state.displayForm);

export const getFormError = createSelector(getForm, (state: FormState) => state.error);
