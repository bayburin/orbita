import { createSelector } from '@ngrx/store';

import { CategoryCacheService } from './../../services/category-cache.service';
import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { CategoryVM } from '../../../entities/view-models/category-vm.interface';
import * as AnswerSelectors from '../answer/answer.selectors';
import * as QuestionSelectors from '../question/question.selectors';
import * as ServiceSelectors from '../service/service.selectors';
import * as CategorySelectors from '../category/category.selectors';
import * as HomeSelectors from '../home/home.selectors';
import { ServiceCacheService } from '../../services/service-cache.service';

// ========== Categories ==========

export const getAllCategoriesVM = createSelector(
  CategorySelectors.getIds,
  CategorySelectors.getEntities,
  ServiceSelectors.getEntities,
  (ids, categories, services): CategoryVM[] => CategoryCacheService.denormalizeCategories(ids, { categories, services })
);

export const getSelectedCategoryVM = createSelector(
  CategorySelectors.getSelected,
  ServiceSelectors.getEntities,
  QuestionSelectors.getEntities,
  AnswerSelectors.getEntities,
  (category, services, questions, answers): CategoryVM =>
    CategoryCacheService.denormalizeCategory(category, { services, questions, answers })
);

// ========== Home ==========

export const getHomeCategoriesVM = createSelector(
  HomeSelectors.getCategoryIds,
  CategorySelectors.getEntities,
  ServiceSelectors.getEntities,
  QuestionSelectors.getEntities,
  (ids, categories, services, questions): CategoryVM[] =>
    CategoryCacheService.denormalizeCategories(ids, { categories, services, questions })
);

export const getHomeServicesVM = createSelector(
  HomeSelectors.getServiceIds,
  ServiceSelectors.getEntities,
  QuestionSelectors.getEntities,
  (ids, services, questions): ServiceVM[] => ServiceCacheService.denormalizeServices(ids, { services, questions })
);
