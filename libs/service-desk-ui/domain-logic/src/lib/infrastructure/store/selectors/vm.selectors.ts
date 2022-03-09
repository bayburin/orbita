import { createSelector } from '@ngrx/store';

import { ResponsibleUserForm } from './../../../entities/form/responsible-user-form.interface';
import { TicketCacheService } from './../../services/ticket-cache.service';
import { TicketOverviewVM } from './../../../entities/view-models/ticket-overview-vm.interface';
import { SearchResultTypes } from './../../../entities/models/search-result.types';
import { CategoryCacheService } from './../../services/category-cache.service';
import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { CategoryVM } from '../../../entities/view-models/category-vm.interface';
import { ServiceCacheService } from '../../services/service-cache.service';
import { QuestionCacheService } from '../../services/question-cache.service';
import { DeepSearchFilterTypes } from '../../../entities/filter.interface';
import { ServiceOverviewVM } from './../../../entities/view-models/service-overview-vm.interface';
import * as AnswerSelectors from '../answer/answer.selectors';
import * as QuestionSelectors from '../question/question.selectors';
import * as ServiceSelectors from '../service/service.selectors';
import * as CategorySelectors from '../category/category.selectors';
import * as HomeSelectors from '../home/home.selectors';
import * as DeepSearchSelectors from '../deep-search/deep-search.selectors';
import * as ResponsibleUserSelectors from '../responsible-user/responsible-user.selectors';
import * as AttachmentSelectors from '../attachment/attachment.selectors';
import * as TicketSelectors from '../ticket/ticket.selectors';
import * as EmployeeSelectors from '../employee/employee.selectors';
import * as TagSelectors from '../tag/tag.selectors';

// ========== Tickets ==========

export const getSelectedTicketOverviewVM = createSelector(
  TicketSelectors.getSelected,
  ServiceSelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  (ticket, services, responsible_users): TicketOverviewVM =>
    TicketCacheService.denormalizeTicket(ticket, { services, responsible_users })
);

// ========== Services ==========

export const getAllServicesVM = createSelector(
  ServiceSelectors.getIds,
  ServiceSelectors.getEntities,
  CategorySelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  EmployeeSelectors.getEntities,
  (ids, services, categories, responsible_users, employees): ServiceOverviewVM[] =>
    ServiceCacheService.denormalizeServices(ids, {
      categories,
      services,
      responsible_users,
      employees,
    }) as ServiceOverviewVM[]
);

export const getSelectedOverviewServiceVM = createSelector(
  ServiceSelectors.getSelected,
  QuestionSelectors.getEntities,
  AnswerSelectors.getEntities,
  CategorySelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  AttachmentSelectors.getEntities,
  EmployeeSelectors.getEntities,
  TagSelectors.getEntities,
  (service, questions, answers, categories, responsible_users, attachments, employees, tags): ServiceOverviewVM =>
    ServiceCacheService.denormalizeService(service, {
      questions,
      answers,
      categories,
      responsible_users,
      attachments,
      employees,
      tags,
    }) as ServiceOverviewVM
);

export const getSelectedServiceVM = createSelector(
  ServiceSelectors.getSelected,
  QuestionSelectors.getEntities,
  AnswerSelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  AttachmentSelectors.getEntities,
  EmployeeSelectors.getEntities,
  (service, questions, answers, responsible_users, attachments, employees): ServiceVM =>
    ServiceCacheService.denormalizeService(service, {
      questions,
      answers,
      responsible_users,
      attachments,
      employees,
    }) as ServiceVM
);

// Селектор выводит список работников (как результат поиска в админке услуги), исключая из выдачи тех работников, которые уже выбраны
export const getSearchedEmployeesForServiceForm = createSelector(
  ServiceSelectors.getFormData,
  EmployeeSelectors.getSearched,
  (formData, employees) => {
    if (formData && formData.responsible_users.length) {
      return employees.filter(
        (employee) =>
          !formData.responsible_users.some(
            (user: ResponsibleUserForm) => user.tn === employee.personnelNo && !user._destroy
          )
      );
    } else {
      return employees;
    }
  }
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
  AnswerSelectors.getEntities,
  AttachmentSelectors.getEntities,
  EmployeeSelectors.getEntities,
  (
    selectedId,
    categoriesArr,
    serviceIds,
    questionIds,
    services,
    questions,
    responsible_users,
    answers,
    attachments,
    employees
  ): SearchResultTypes[] => {
    const getServices = () => ServiceCacheService.denormalizeServices(serviceIds, { services, questions });
    const getQuestions = () =>
      QuestionCacheService.denormalizeQuestions(questionIds, {
        questions,
        responsible_users,
        answers,
        attachments,
        employees,
      });

    switch (selectedId) {
      case DeepSearchFilterTypes.CATEGORY:
        return categoriesArr;
      case DeepSearchFilterTypes.SERVICE:
        return getServices();
      case DeepSearchFilterTypes.QUESTION:
        return getQuestions();
      default:
        return [...categoriesArr, ...getServices(), ...getQuestions()];
    }
  }
);
