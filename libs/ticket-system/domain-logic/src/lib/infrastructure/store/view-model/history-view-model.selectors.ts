import { createSelector } from '@ngrx/store';

import * as HistorySelectors from '../history/history.selectors';
import * as UserSelectors from '../user/user.selectors';
import { HistoryViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getEntitiesViewModel = createSelector(
  HistorySelectors.getEntities,
  UserSelectors.getEntities,
  (historyEntities, userEntities): HistoryViewModelDict => {
    return Object.keys(historyEntities).reduce<HistoryViewModelDict>((acc, key) => {
      const historyViewModel = historyEntities[key];

      acc[key] = {
        ...historyViewModel,
        user: userEntities[historyViewModel.user_id]
      }

      return acc;
    }, {})
  }
)
