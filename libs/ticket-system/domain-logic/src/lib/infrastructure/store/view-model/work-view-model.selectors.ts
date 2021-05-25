import { createSelector } from '@ngrx/store';

import * as WorkSelectors from '../work/work.selectors';
import * as GroupSelectors from '../group/group.selectors';
import * as HistoryViewModelSelectors from './history-view-model.selectors';
import { WorkViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getEntitiesViewModel = createSelector(
  WorkSelectors.getEntities,
  GroupSelectors.getEntities,
  HistoryViewModelSelectors.getEntitiesViewModel,
  (workEntities, groupEntities, historyEntities): WorkViewModelDict => {
    return Object.keys(workEntities).reduce<WorkViewModelDict>((acc, key) => {
      const workViewModel = workEntities[key];
      const histories = workViewModel.histories.map(historyId => historyEntities[historyId]);

      acc[key] = {
        ...workViewModel,
        group: groupEntities[workViewModel.group_id],
        histories
      }

      return acc;
    }, {})
  }
)
