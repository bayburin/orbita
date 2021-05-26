import { createSelector } from '@ngrx/store';

import * as WorkSelectors from '../work/work.selectors';
import * as GroupSelectors from '../group/group.selectors';
import * as HistoryViewModelSelectors from './history-view-model.selectors';
import * as WorkerViewModelSelectors from './worker-view-model.selector';
import { WorkViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getEntitiesViewModel = createSelector(
  WorkSelectors.getEntities,
  GroupSelectors.getEntities,
  HistoryViewModelSelectors.getEntitiesViewModel,
  WorkerViewModelSelectors.getEntitiesViewModel,
  (workEntities, groupEntities, historyEntities, workerEntities): WorkViewModelDict => {
    return Object.keys(workEntities).reduce<WorkViewModelDict>((acc, key) => {
      const workViewModel = workEntities[key];
      const histories = workViewModel.histories.map(historyId => historyEntities[historyId]);
      const workers = workViewModel.workers.map(workerId => workerEntities[workerId]);

      acc[key] = {
        ...workViewModel,
        group: groupEntities[workViewModel.group_id],
        histories,
        workers
      }

      return acc;
    }, {})
  }
)
