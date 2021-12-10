import { createSelector } from '@ngrx/store';

import { HOME_FEATURE_KEY, State, HomePartialState } from './home.reducer';
import { getServiceDeskUiState } from '../index';
import * as CategorySelectors from '../category/category.selectors';
import * as ServiceSelectors from '../service/service.selectors';

export const getHomeState = createSelector(getServiceDeskUiState, (state: HomePartialState) => state[HOME_FEATURE_KEY]);

export const getLoading = createSelector(getHomeState, (state: State) => state.loading);

export const getLoaded = createSelector(getHomeState, (state: State) => state.loaded);

export const getCategoryIds = createSelector(getHomeState, (state: State) => state.categoryIds);

export const getServiceIds = createSelector(getHomeState, (state: State) => state.serviceIds);

export const getError = createSelector(getHomeState, (state: State) => state.error);

export const getCategories = createSelector(getCategoryIds, CategorySelectors.getEntities, (ids, categoryEntities) =>
  ids.map((id) => categoryEntities[id])
);

export const getServices = createSelector(getServiceIds, ServiceSelectors.getEntities, (ids, serviceEntities) =>
  ids.map((id) => serviceEntities[id])
);
