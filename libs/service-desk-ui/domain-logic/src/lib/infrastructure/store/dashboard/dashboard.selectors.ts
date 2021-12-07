import { createSelector } from '@ngrx/store';

import { DASHBOARD_FEATURE_KEY, State, DashboardPartialState } from './dashboard.reducer';
import { getServiceDeskUiState } from './../index';
import * as CategorySelectors from '../category/category.selectors';
import * as ServiceSelectors from '../service/service.selectors';

export const getDashboardState = createSelector(
  getServiceDeskUiState,
  (state: DashboardPartialState) => state[DASHBOARD_FEATURE_KEY]
);

export const getLoading = createSelector(getDashboardState, (state: State) => state.loading);

export const getLoaded = createSelector(getDashboardState, (state: State) => state.loaded);

export const getCategoryIds = createSelector(getDashboardState, (state: State) => state.categoryIds);

export const getServiceIds = createSelector(getDashboardState, (state: State) => state.serviceIds);

export const getError = createSelector(getDashboardState, (state: State) => state.error);

export const getCategories = createSelector(getCategoryIds, CategorySelectors.getEntities, (ids, categoryEntities) =>
  ids.map((id) => categoryEntities[id])
);

export const getServices = createSelector(getServiceIds, ServiceSelectors.getEntities, (ids, serviceEntities) =>
  ids.map((id) => serviceEntities[id])
);
