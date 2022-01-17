import { createSelector } from '@ngrx/store';

import { TICKET_FEATURE_KEY, State, ticketAdapter, TicketPartialState } from './ticket.reducer';
import { getServiceDeskUiState } from './../index';

export const getTicketState = createSelector(
  getServiceDeskUiState,
  (state: TicketPartialState) => state[TICKET_FEATURE_KEY]
);

const { selectAll, selectEntities } = ticketAdapter.getSelectors();

export const getLoaded = createSelector(getTicketState, (state: State) => state.loaded);

export const getAll = createSelector(getTicketState, (state: State) => selectAll(state));

export const getEntities = createSelector(getTicketState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getTicketState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
