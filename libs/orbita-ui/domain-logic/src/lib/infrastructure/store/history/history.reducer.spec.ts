import { Action } from '@ngrx/store';

import { History } from './../../../entities/models/history.interface';
import * as HistoryActions from './history.actions';
import { State, initialState, reducer } from './history.reducer';

describe('HistoryReducer', () => {
  let action: Action;
  const createHistoryEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as History);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const histories = [createHistoryEntity(1), createHistoryEntity(2)];
      action = HistoryActions.setAll({ histories });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const histories = [createHistoryEntity(1), createHistoryEntity(2)];
      action = HistoryActions.setAll({ histories });
      let result: State = reducer(initialState, action);
      action = HistoryActions.clearAll();
      result = reducer(result, action);

      expect(result.ids.length).toBe(0);
      expect(result.loaded).toBe(false);
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
