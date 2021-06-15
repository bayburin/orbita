import { Action } from '@ngrx/store';

import { SdTicket } from '../../../entities/models/sd/sd-ticket.interface';
import * as SdTicketActions from './sd-ticket.actions';
import { State, initialState, reducer } from './sd-ticket.reducer';

describe('SdTicketReducer', () => {
  let action: Action;
  const createSdTicket = (id: string, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as SdTicket);

  describe('loadAll', () => {
    it('should clear "loading" and "error" attributes', () => {
      action = SdTicketActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.needTickets).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should return set the list of known SdTicket', () => {
      const tickets = [createSdTicket('PRODUCT-AAA'), createSdTicket('PRODUCT-zzz')];
      action = SdTicketActions.loadAllSuccess({ tickets });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" attribute', () => {
      const error = { message: 'error' };
      action = SdTicketActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
