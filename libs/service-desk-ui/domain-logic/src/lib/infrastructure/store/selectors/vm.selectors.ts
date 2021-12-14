import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { TicketVM } from './../../../entities/view-models/ticket-vm.interface';
import { QuestionVM } from '../../../entities/view-models/question-vm.interface';
import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { CategoryVM } from '../../../entities/view-models/category-vm.interface';
import * as QuestionSelectors from '../question/question.selectors';
import * as ServiceSelectors from '../service/service.selectors';
import * as CategorySelectors from '../category/category.selectors';
import * as ResponsibleUserSelectors from '../responsible-user/responsible-user.selectors';
import * as HomeSelectors from '../home/home.selectors';

// ========== Questions ==========

export const getQuestionEntitiesVM = createSelector(
  QuestionSelectors.getEntities,
  ResponsibleUserSelectors.getEntities,
  (questionEntities, responsibleUserEntities) =>
    Object.keys(questionEntities)
      .map(Number)
      .reduce<Dictionary<QuestionVM>>((acc, key) => {
        const entity = questionEntities[key];
        const ticket: TicketVM = {
          ...entity.ticket,
          responsible_users: entity.ticket.responsible_users
            ? entity.ticket.responsible_users.map((id) => responsibleUserEntities[id])
            : [],
        };
        const correction = questionEntities[key];
        const correctionVM: QuestionVM = {
          ...correction,
          correction: null,
          ticket: {
            ...correction.ticket,
            responsible_users: correction.ticket.responsible_users
              ? correction.ticket.responsible_users.map((id) => responsibleUserEntities[id])
              : [],
          },
        };

        acc[key] = {
          ...entity,
          ticket,
          correction: entity.correction ? correctionVM : null,
        };

        return acc;
      }, {})
);

// ========== Services ==========

export const getServiceEntitiesVM = createSelector(
  ServiceSelectors.getEntities,
  QuestionSelectors.getEntities,
  (serviceEntities, questionEntities) =>
    Object.keys(serviceEntities)
      .map(Number)
      .reduce<Dictionary<ServiceVM>>((acc, key) => {
        const entity = serviceEntities[key];
        const questions = entity.questions ? entity.questions.map((id) => questionEntities[id]) : [];

        acc[key] = {
          ...entity,
          questions,
          responsible_users: [],
        };

        return acc;
      }, {})
);

export const getAllServicesVM = createSelector(
  ServiceSelectors.getAll,
  QuestionSelectors.getEntities,
  (services, questionEntities): ServiceVM[] =>
    services.map((service) => {
      const questions = service.questions ? service.questions.map((id) => questionEntities[id]) : [];

      return {
        ...service,
        questions,
        responsible_users: [],
      };
    })
);

// ========== Categories ==========

export const getAllCategoriesVM = createSelector(
  CategorySelectors.getAll,
  getServiceEntitiesVM,
  (categories, serviceEntities): CategoryVM[] =>
    categories.map((category) => {
      const services = category.services ? category.services.map((id) => serviceEntities[id]) : [];

      return {
        ...category,
        services,
        faq: null,
      };
    })
);

export const getSelectedCategoryVM = createSelector(
  CategorySelectors.getSelected,
  getServiceEntitiesVM,
  getQuestionEntitiesVM,
  (category, serviceEntities, questionEntities): CategoryVM => {
    const services = category.services ? category.services.map((id) => serviceEntities[id]) : [];
    const faq = category.faq ? category.faq.map((id) => questionEntities[id]) : [];

    return {
      ...category,
      services,
      faq,
    };
  }
);

// ========== Home ==========

export const getHomeCategoriesVM = createSelector(
  HomeSelectors.getCategories,
  getServiceEntitiesVM,
  (categories, serviceEntities): CategoryVM[] =>
    categories.map((category) => {
      const services = category.services ? category.services.map((id) => serviceEntities[id]) : [];

      return {
        ...category,
        services,
        faq: null,
      };
    })
);

export const getHomeServicesVM = createSelector(
  HomeSelectors.getServices,
  QuestionSelectors.getEntities,
  (services, questionEntities): ServiceVM[] =>
    services.map((service) => {
      const questions = service.questions ? service.questions.map((id) => questionEntities[id]) : [];

      return {
        ...service,
        questions,
        responsible_users: [],
      };
    })
);
