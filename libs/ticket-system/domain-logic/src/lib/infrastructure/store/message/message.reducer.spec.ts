import { Action } from '@ngrx/store';

import { Message } from './../../../entities/models/message.interface';
import * as MessageActions from './message.actions';
import { State, initialState, reducer } from './message.reducer';

describe('MessageReducer', () => {
  let action: Action;
  const createMessageEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Message);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const messages = [
        createMessageEntity(1),
        createMessageEntity(2)
      ];
      action = MessageActions.setAll({ messages });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2)
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
