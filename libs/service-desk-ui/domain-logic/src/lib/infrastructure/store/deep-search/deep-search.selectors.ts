import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { DEEP_SEARCH_FEATURE_KEY, State, DeepSearchPartialState } from './deep-search.reducer';
import { Filter } from '../../../entities/filter.interface';
import { DeepSearchFilterTypes } from './../../../entities/filter.interface';
import * as CategorySelectors from '../category/category.selectors';
import * as ServiceSelectors from '../service/service.selectors';
import * as QuestionSelectors from '../question/question.selectors';

export const getDeepSearchState = createSelector(
  getServiceDeskUiState,
  (state: DeepSearchPartialState) => state[DEEP_SEARCH_FEATURE_KEY]
);

export const getLoading = createSelector(getDeepSearchState, (state: State) => state.loading);

export const getLoaded = createSelector(getDeepSearchState, (state: State) => state.loaded);

export const getError = createSelector(getDeepSearchState, (state: State) => state.error);

export const getCategoryIds = createSelector(getDeepSearchState, (state: State) => state.categoryIds);

export const getServiceIds = createSelector(getDeepSearchState, (state: State) => state.serviceIds);

export const getQuestionIds = createSelector(getDeepSearchState, (state: State) => state.questionIds);

export const getCategories = createSelector(getCategoryIds, CategorySelectors.getEntities, (ids, categoryEntities) =>
  ids.map((id) => categoryEntities[id])
);

export const getServices = createSelector(getServiceIds, ServiceSelectors.getEntities, (ids, serviceEntities) =>
  ids.map((id) => serviceEntities[id])
);

export const getQuestions = createSelector(getQuestionIds, QuestionSelectors.getEntities, (ids, questionEntities) =>
  ids.map((id) => questionEntities[id])
);

export const getResultTypes = createSelector(
  getCategoryIds,
  getServiceIds,
  getQuestionIds,
  (categoryIds, serviceIds, questionIds): Filter[] => [
    {
      name: 'Все',
      id: DeepSearchFilterTypes.ALL,
      count: categoryIds.length + serviceIds.length + questionIds.length,
    },
    {
      name: 'Категории',
      id: DeepSearchFilterTypes.CATEGORY,
      count: categoryIds.length,
    },
    {
      name: 'Услуги',
      id: DeepSearchFilterTypes.SERVICE,
      count: serviceIds.length,
    },
    {
      name: 'Вопросы',
      id: DeepSearchFilterTypes.QUESTION,
      count: questionIds.length,
    },
  ]
);

export const getSelectedResultTypeId = createSelector(getDeepSearchState, (state: State) => state.selectedResultTypeId);

export const getIsAnyResult = createSelector(
  getCategoryIds,
  getServiceIds,
  getQuestionIds,
  (categoryIds, serviceIds, questionIds) => {
    return categoryIds.length > 0 || serviceIds.length > 0 || questionIds.length > 0;
  }
);
