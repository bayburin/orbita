import { Action } from '@ngrx/store';

import * as TicketActions from './ticket.actions';
import { Ticket } from '../../../entities/model/ticket.interface';
import { State, initialState, reducer } from './ticket.reducer';

describe('TicketReducer', () => {
  let action: Action;
  const createTicket = (id: number, name = ''): Ticket =>
    ({
      id,
      name: name || `name-${id}`,
    } as Ticket);

  describe('setAll', () => {
    it('should change attributes', () => {
      const tickets = [createTicket(111), createTicket(222)];
      action = TicketActions.setAll({ tickets });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
