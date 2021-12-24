import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TicketActions from './ticket.actions';
import { Ticket } from '../../../entities/models/ticket.interface';

export const TICKET_FEATURE_KEY = 'ticket';

export interface State extends EntityState<Ticket> {}

export interface TicketPartialState {
  readonly [TICKET_FEATURE_KEY]: State;
}

export const ticketAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialState: State = ticketAdapter.getInitialState({});

const ticketReducer = createReducer(
  initialState,
  on(TicketActions.setAll, (state, { tickets }) => ticketAdapter.setAll(tickets, state))
);

export function reducer(state: State | undefined, action: Action) {
  return ticketReducer(state, action);
}
