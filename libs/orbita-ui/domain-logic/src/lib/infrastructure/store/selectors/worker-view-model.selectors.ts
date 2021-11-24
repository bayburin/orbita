import { createSelector } from '@ngrx/store';

import * as WorkerSelectors from '../worker/worker.selectors';
import * as UserSelectors from '../user/user.selectors';
import { WorkerViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getEntitiesViewModel = createSelector(
  WorkerSelectors.getEntities,
  UserSelectors.getEntities,
  (workerEntities, userEntities) =>
    Object.keys(workerEntities)
      .map(Number)
      .reduce<WorkerViewModelDict>((acc, key) => {
        const entity = workerEntities[key];

        acc[key] = {
          ...entity,
          user: userEntities[entity.user_id],
        };

        return acc;
      }, {})
);
