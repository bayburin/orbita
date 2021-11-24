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
  (workEntities, groupEntities, historyEntities, workerEntities, workflowEntities) => {
    return Object.keys(workEntities)
      .map(Number)
      .reduce<WorkViewModelDict>((acc, key) => {
        const workEntity = workEntities[key];
        const histories = workEntity.histories.reduce<HistoryViewModel[]>((arr, historyId) => {
          if (historyEntities[historyId]) {
            arr.push(historyEntities[historyId]);
          }

          return arr;
        }, []);
        const workers = workEntity.workers.reduce<WorkerViewModel[]>((arr, workerId) => {
          if (workerEntities[workerId]) {
            arr.push(workerEntities[workerId]);
          }

          return arr;
        }, []);

        const workflows =
          workEntity.workflows?.reduce<MessageViewModel[]>((arr, workflowId) => {
            if (workflowEntities[workflowId]) {
              arr.push(workflowEntities[workflowId]);
            }

            return arr;
          }, []) || [];

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
