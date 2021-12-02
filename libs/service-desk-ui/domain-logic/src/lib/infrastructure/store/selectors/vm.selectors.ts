import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { CategoryVM } from '../../../entities/view-models/category-vm.interface';
import * as ServiceSelectors from '../service/service.selectors';
import * as CategorySelectors from '../category/category.selectors';

export const getServiceEntitiesVM = createSelector(ServiceSelectors.getEntities, (serviceEntities) =>
  Object.keys(serviceEntities)
    .map(Number)
    .reduce<Dictionary<ServiceVM>>((acc, key) => {
      const entity = serviceEntities[key];

      acc[key] = {
        ...entity,
        tickets: [],
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
