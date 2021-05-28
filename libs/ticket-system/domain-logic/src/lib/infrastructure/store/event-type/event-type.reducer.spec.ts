import { Action } from '@ngrx/store';

import { EventType } from './../../../entities/models/event-type.interface';
import * as EventTypeActions from './event-type.actions';
import { State, initialState, reducer } from './event-type.reducer';

describe('EventTypeReducer', () => {
  let action: Action;
  const createEventTypeEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as EventType);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const eventTypes = [
        createEventTypeEntity(1),
        createEventTypeEntity(2)
      ];
      action = EventTypeActions.setAll({ eventTypes });
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
