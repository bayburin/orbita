import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { SD_TICKET_FEATURE_KEY, State, SdTicketPartialState, sdTicketAdapter } from './sd-ticket.reducer';

export const getSdTicketState = createSelector(
  getOrbitaUiState,
  (state: SdTicketPartialState) => state[SD_TICKET_FEATURE_KEY]
);

const { selectAll, selectEntities } = sdTicketAdapter.getSelectors();

export const getLoading = createSelector(getSdTicketState, (state: State) => state.loading);

export const getLoaded = createSelector(getSdTicketState, (state: State) => state.loaded);

export const getNeedTickets = createSelector(getSdTicketState, (state: State) => state.needTickets);

export const getError = createSelector(getSdTicketState, (state: State) => state.error);

export const getAll = createSelector(getSdTicketState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSdTicketState, (state: State) => selectEntities(state));
