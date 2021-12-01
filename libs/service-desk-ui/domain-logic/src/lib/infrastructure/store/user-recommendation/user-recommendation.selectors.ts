import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  USER_RECOMMENDATION_FEATURE_KEY,
  State,
  userRecommendationAdapter,
  UserRecommendationPartialState,
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

export const getAll = createSelector(getUserRecommendationState, (state: State) => selectAll(state));

export const getEntities = createSelector(getUserRecommendationState, (state: State) => selectEntities(state));
