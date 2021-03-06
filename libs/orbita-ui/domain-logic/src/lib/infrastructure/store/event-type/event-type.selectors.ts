import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  EVENT_TYPE_FEATURE_KEY,
  State,
  EventTypePartialState,
  eventTypeAdapter,
} from './event-type.reducer';

export const getEventTypeState = createSelector(
  getOrbitaUiState,
  (state: EventTypePartialState) => state[EVENT_TYPE_FEATURE_KEY]
);

const { selectAll, selectEntities } = eventTypeAdapter.getSelectors();

export const getLoaded = createSelector(
  getEventTypeState,
  (state: State) => state.loaded
);

export const getAll = createSelector(getEventTypeState, (state: State) =>
  selectAll(state)
);

export const getEntities = createSelector(getEventTypeState, (state: State) =>
  selectEntities(state)
);
