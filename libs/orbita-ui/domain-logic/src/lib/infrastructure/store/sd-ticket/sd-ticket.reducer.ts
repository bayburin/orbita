import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdTicketActions from './sd-ticket.actions';
import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

export const SD_TICKET_FEATURE_KEY = 'sdTicket';

export interface State extends EntityState<SdTicket> {
  loading: boolean;
  loaded: boolean;
  needTickets: boolean;
  selectedIdentity?: number;
  error?: string | null;
}

export interface SdTicketPartialState {
  readonly [SD_TICKET_FEATURE_KEY]: State;
}

export const sdTicketAdapter: EntityAdapter<SdTicket> = createEntityAdapter<SdTicket>({
  selectId: (ticket: SdTicket) => ticket.identity,
});

export const initialState: State = sdTicketAdapter.getInitialState({
  loading: false,
  loaded: false,
  needTickets: true,
});

const sdTicketReducer = createReducer(
  initialState,
  on(SdTicketActions.loadAll, SdTicketActions.loadTicket, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(SdTicketActions.loadAllSuccess, (state, { tickets }) =>
    sdTicketAdapter.setAll(tickets, { ...state, loading: false, loaded: true, needTickets: false })
  ),
  on(SdTicketActions.loadAllFailure, SdTicketActions.loadTicketFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(SdTicketActions.selectTicketIdentity, (state, { identity }) => ({ ...state, selectedIdentity: identity })),
  on(SdTicketActions.clearSelectedTicketIdentity, (state) => ({ ...state, selectedIdentity: null })),
  on(SdTicketActions.loadTicketSuccess, (state, { ticket }) =>
    sdTicketAdapter.setOne(ticket, { ...state, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return sdTicketReducer(state, action);
}
