import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import {
  SEARCH_FEATURE_KEY,
  State,
  SearchPartialState,
  searchCategoryAdapter,
  searchServiceAdapter,
  searchQuestionAdapter,
  searchResponsibleUserAdapter,
} from './search.reducer';
import { SearchResultTypes } from './../../../entities/model/search-result.types';
import { QuestionCacheService } from '../../services/question-cache.service';
import { ServiceCacheService } from '../../services/service-cache.service';

export const getSearchState = createSelector(
  getServiceDeskUiState,
  (state: SearchPartialState) => state[SEARCH_FEATURE_KEY]
);

const { selectAll: selectAllCategories, selectEntities: selectCategoryEntities } = searchCategoryAdapter.getSelectors();
const { selectAll: selectAllServices, selectEntities: selectServiceEntities } = searchServiceAdapter.getSelectors();
const { selectAll: selectAllQuestions, selectEntities: selectQuestionEntities } = searchQuestionAdapter.getSelectors();
const { selectAll: selectAllResponsibleUsers, selectEntities: selectResponsibleUserEntities } =
  searchResponsibleUserAdapter.getSelectors();

// ========== Основное хранилище ==========

export const getLoading = createSelector(getSearchState, (state: State) => state.loading);

export const getLoaded = createSelector(getSearchState, (state: State) => state.loaded);

export const getError = createSelector(getSearchState, (state: State) => state.error);

export const getCategoryIds = createSelector(getSearchState, (state: State) => state.categoryIds);

export const getServiceIds = createSelector(getSearchState, (state: State) => state.serviceIds);

export const getQuestionIds = createSelector(getSearchState, (state: State) => state.questionIds);

// ========== Подтип хранилища Category ==========

export const getAllCategories = createSelector(getSearchState, (state: State) => selectAllCategories(state.category));

export const getCategoryEntities = createSelector(getSearchState, (state: State) =>
  selectCategoryEntities(state.category)
);

export const getSearchCategories = createSelector(getCategoryIds, getCategoryEntities, (ids, entities) =>
  ids.map((id) => entities[id])
);

// ========== Подтип хранилища Service ==========

export const getAllServices = createSelector(getSearchState, (state: State) => selectAllServices(state.service));

export const getServiceEntities = createSelector(getSearchState, (state: State) =>
  selectServiceEntities(state.service)
);

export const getSearchServices = createSelector(getServiceIds, getServiceEntities, (ids, entities) =>
  ids.map((id) => entities[id])
);

// ========== Подтип хранилища Question ==========

export const getAllQuestions = createSelector(getSearchState, (state: State) => selectAllQuestions(state.question));

export const getQuestionEntities = createSelector(getSearchState, (state: State) =>
  selectQuestionEntities(state.question)
);

export const getSearchQuestions = createSelector(getQuestionIds, getQuestionEntities, (ids, entities) =>
  ids.map((id) => entities[id])
);

// ========== Подтип хранилища ResponsibleUser ==========

export const getAllResponsibleUsers = createSelector(getSearchState, (state: State) =>
  selectAllResponsibleUsers(state.responsibleUser)
);

export const getResponsibleUserEntities = createSelector(getSearchState, (state: State) =>
  selectResponsibleUserEntities(state.responsibleUser)
);

// ========== View Model Selectors ==========

export const getSearchResult = createSelector(
  getSearchCategories,
  getServiceIds,
  getQuestionIds,
  getServiceEntities,
  getQuestionEntities,
  getResponsibleUserEntities,
  (categoriesArr, serviceIds, questionIds, services, questions, responsible_users): SearchResultTypes[] => {
    const servicesVM = ServiceCacheService.denormalizeServices(serviceIds, { services, questions });
    const questionsVM = QuestionCacheService.denormalizeQuestions(questionIds, {
      questions,
      services,
      responsible_users,
    });

    return [...categoriesArr, ...servicesVM, ...questionsVM];
  }
);
