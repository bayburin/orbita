import { Action } from '@ngrx/store';

import * as TicketActions from './ticket.actions';
import { Ticket } from '../../../entities/models/ticket.interface';
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

  describe('loadSelected', () => {
    it('should change attributes', () => {
      action = TicketActions.loadSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should change attributes', () => {
      const ticket = createTicket(111);
      action = TicketActions.loadSelectedSuccess({ ticket });
      const result: State = reducer(initialState, action);

      expect(result.entities[ticket.id]).toEqual(ticket);
      expect(result.selectedId).toEqual(ticket.id);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      action = TicketActions.loadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(error);
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
