import { createSelector } from '@ngrx/store';

import * as WorkSelectors from '../work/work.selectors';
import * as GroupSelectors from '../group/group.selectors';
import * as HistoryViewModelSelectors from './history-view-model.selectors';
import * as WorkerViewModelSelectors from './worker-view-model.selectors';
import * as MessageViewModelSelectors from './message-view-model.selectors';
import { WorkViewModelDict } from './../../../entities/view-models/dictionaries.interface';
import { HistoryViewModel } from './../../../entities/view-models/history-view-model.interface';
import { WorkerViewModel } from './../../../entities/view-models/worker-view-model.interface';
import { MessageViewModel } from './../../../entities/view-models/message-view-model.interface';

export const getEntitiesViewModel = createSelector(
  WorkSelectors.getEntities,
  GroupSelectors.getEntities,
  HistoryViewModelSelectors.getEntitiesViewModel,
  WorkerViewModelSelectors.getEntitiesViewModel,
  MessageViewModelSelectors.getEntitiesViewModel,
  (workEntities, groupEntities, historyEntities, workerEntities, workflowEntities): WorkViewModelDict => {
    return Object.keys(workEntities)
      .map(Number)
      .reduce<WorkViewModelDict>((acc, key) => {
        const workEntity = workEntities[key];
        const histories = workEntity.histories.reduce(
          (arr, historyId) => (historyEntities[historyId] ? arr.concat(historyEntities[historyId]) : arr),
          [] as HistoryViewModel[]
        );
        const workers = workEntity.workers.reduce(
          (arr, workerId) => (workerEntities[workerId] ? arr.concat(workerEntities[workerId]) : arr),
          [] as WorkerViewModel[]
        );
        const workflows = workEntity.workflows
          ? workEntity.workflows.reduce(
              (arr, workflowId) => (workflowEntities[workflowId] ? arr.concat(workflowEntities[workflowId]) : arr),
              [] as MessageViewModel[]
            )
          : [];

        acc[key] = {
          ...workEntity,
          group: groupEntities[workEntity.group_id],
          histories,
          workers,
          workflows,
        };

        return acc;
      }, {});
  }
);
