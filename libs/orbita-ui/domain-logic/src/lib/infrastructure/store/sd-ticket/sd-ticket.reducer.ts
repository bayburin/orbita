import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdTicketActions from './sd-ticket.actions';
import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

export const SD_TICKET_FEATURE_KEY = 'sdTicket';

export interface State extends EntityState<SdTicket> {
  loading: boolean;
  loaded: boolean;
  needTickets: boolean;
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
  on(SdTicketActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    needTickets: false,
    error: null,
  })),
  on(SdTicketActions.loadAllSuccess, (state, { tickets }) =>
    sdTicketAdapter.setAll(tickets, { ...state, loading: false, loaded: true })
  ),
  on(SdTicketActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdTicketReducer(state, action);
}
