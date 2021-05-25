import { createSelector } from '@ngrx/store';

import * as HistorySelectors from '../history/history.selectors';
import * as UserSelectors from '../user/user.selectors';
import * as EventTypeSelectors from '../event-type/event-type.selectors';
import { HistoryViewModelDict } from './../../../entities/view-models/dictionaries.interface';

export const getEntitiesViewModel = createSelector(
  HistorySelectors.getEntities,
  UserSelectors.getEntities,
  EventTypeSelectors.getEntities,
  (historyEntities, userEntities, eventTypeEntities): HistoryViewModelDict => {
    return Object.keys(historyEntities).reduce<HistoryViewModelDict>((acc, key) => {
      const historyViewModel = historyEntities[key];

      acc[key] = {
        ...historyViewModel,
        user: userEntities[historyViewModel.user_id],
        eventType: eventTypeEntities[historyViewModel.event_type_id]
      }

      return acc;
    }, {})
  }
)
