import { createSelector } from '@ngrx/store';

import * as WorkSelectors from '../work/work.selectors';
import * as GroupSelectors from '../group/group.selectors';
import { WorkViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getEntitiesViewModel = createSelector(
  WorkSelectors.getEntities,
  GroupSelectors.getEntities,
  (workEntities, groupEntities): WorkViewModelDict => {
    return Object.keys(workEntities).reduce<WorkViewModelDict>((acc, key) => {
      const entity = workEntities[key];

      acc[key] = {
        ...entity,
        group: groupEntities[entity.group_id]
      }

      return acc;
    }, {})
  }
)
