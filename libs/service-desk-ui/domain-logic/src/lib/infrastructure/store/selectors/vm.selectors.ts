import { createSelector } from '@ngrx/store';

import { SearchResultTypes } from './../../../entities/models/search-result.types';
import { CategoryCacheService } from './../../services/category-cache.service';
import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { CategoryVM } from '../../../entities/view-models/category-vm.interface';
import { ServiceCacheService } from '../../services/service-cache.service';
import { QuestionCacheService } from '../../services/question-cache.service';
import * as AnswerSelectors from '../answer/answer.selectors';
import * as QuestionSelectors from '../question/question.selectors';
import * as ServiceSelectors from '../service/service.selectors';
import * as CategorySelectors from '../category/category.selectors';
import * as HomeSelectors from '../home/home.selectors';
import * as DeepSearchSelectors from '../deep-search/deep-search.selectors';
import * as ResponsibleUserSelectors from '../responsible-user/responsible-user.selectors';
import * as AttachmentSelectors from '../attachment/attachment.selectors';
import { DeepSearchFilterTypes } from '../../../entities/filter.interface';

// ========== Services ==========

export const getSelectedServiceVM = createSelector(
  ServiceSelectors.getSelected,
  QuestionSelectors.getEntities,
  AnswerSelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  AttachmentSelectors.getEntities,
  (service, questions, answers, responsible_users, attachments): ServiceVM =>
    ServiceCacheService.denormalizeService(service, { questions, answers, responsible_users, attachments })
);

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
  AttachmentSelectors.getEntities,
  (category, services, questions, answers, attachments): CategoryVM =>
    CategoryCacheService.denormalizeCategory(category, { services, questions, answers, attachments })
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

// ========== Deep Search ==========

export const getDeepSearchResult = createSelector(
  DeepSearchSelectors.getSelectedResultTypeId,
  DeepSearchSelectors.getCategories,
  DeepSearchSelectors.getServiceIds,
  DeepSearchSelectors.getQuestionIds,
  ServiceSelectors.getEntities,
  QuestionSelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  (selectedId, categoriesArr, serviceIds, questionIds, services, questions, responsible_users): SearchResultTypes[] => {
    let servicesVM;
    let questionsVM;

    switch (selectedId) {
      case DeepSearchFilterTypes.CATEGORY:
        return categoriesArr;
      case DeepSearchFilterTypes.SERVICE:
        servicesVM = ServiceCacheService.denormalizeServices(serviceIds, { services, questions });

        return servicesVM;
      case DeepSearchFilterTypes.QUESTION:
        questionsVM = QuestionCacheService.denormalizeQuestions(questionIds, {
          questions,
          responsible_users,
        });

        return questionsVM;
      default:
        servicesVM = ServiceCacheService.denormalizeServices(serviceIds, { services, questions });
        questionsVM = QuestionCacheService.denormalizeQuestions(questionIds, {
          questions,
          responsible_users,
        });

        return [...categoriesArr, ...servicesVM, ...questionsVM];
    }
  }
);
