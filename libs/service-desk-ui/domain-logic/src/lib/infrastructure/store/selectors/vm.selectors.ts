import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { CategoryVM } from '../../../entities/view-models/category-vm.interface';
import * as QuestionSelectors from '../question/question.selectors';
import * as ServiceSelectors from '../service/service.selectors';
import * as CategorySelectors from '../category/category.selectors';
import * as HomeSelectors from '../home/home.selectors';

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

export const getAllCategoriesVM = createSelector(
  CategorySelectors.getAll,
  getServiceEntitiesVM,
  (categories, serviceEntities): CategoryVM[] =>
    categories.map((category) => {
      const services = category.services ? category.services.map((id) => serviceEntities[id]) : [];

      return {
        ...category,
        services,
      };
    })
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

export const getHomeCategoriesVM = createSelector(
  HomeSelectors.getCategories,
  getServiceEntitiesVM,
  (categories, serviceEntities): CategoryVM[] =>
    categories.map((category) => {
      const services = category.services ? category.services.map((id) => serviceEntities[id]) : [];

      return {
        ...category,
        services,
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
