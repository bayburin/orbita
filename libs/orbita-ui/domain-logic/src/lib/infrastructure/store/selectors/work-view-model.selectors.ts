import { createSelector } from '@ngrx/store';

import * as WorkSelectors from '../work/work.selectors';
import * as GroupSelectors from '../group/group.selectors';
import * as HistoryViewModelSelectors from './history-view-model.selectors';
import * as WorkerViewModelSelectors from './worker-view-model.selector';
import { WorkViewModelDict } from './../../../entities/view-models/dictionaries.interface';
import { HistoryViewModel } from './../../../entities/view-models/history-view-model.interface';
import { WorkerViewModel } from './../../../entities/view-models/worker-view-model.interface';

export const getEntitiesViewModel = createSelector(
  WorkSelectors.getEntities,
  GroupSelectors.getEntities,
  HistoryViewModelSelectors.getEntitiesViewModel,
  WorkerViewModelSelectors.getEntitiesViewModel,
  (workEntities, groupEntities, historyEntities, workerEntities): WorkViewModelDict => {
    return Object.keys(workEntities)
      .map(Number)
      .reduce<WorkViewModelDict>((acc, key) => {
        const workViewModel = workEntities[key];
        const histories = workViewModel.histories.reduce(
          (arr, historyId) => (historyEntities[historyId] ? arr.concat(historyEntities[historyId]) : arr),
          [] as HistoryViewModel[]
        );
        const workers = workViewModel.workers.reduce(
          (arr, workerId) => (workerEntities[workerId] ? arr.concat(workerEntities[workerId]) : arr),
          [] as WorkerViewModel[]
        );

        acc[key] = {
          ...workViewModel,
          group: groupEntities[workViewModel.group_id],
          histories,
          workers,
        };

        return acc;
      }, {});
  }
);
