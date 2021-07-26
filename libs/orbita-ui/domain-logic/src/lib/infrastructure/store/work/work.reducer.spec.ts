import { Action } from '@ngrx/store';

import { Work } from './../../../entities/models/work.interface';
import * as WorkActions from './work.actions';
import { State, initialState, reducer } from './work.reducer';

describe('WorkReducer', () => {
  let action: Action;
  const createWorkEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Work);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const works = [createWorkEntity(1), createWorkEntity(2)];
      action = WorkActions.setAll({ works });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const works = [createWorkEntity(1), createWorkEntity(2)];
      action = WorkActions.setAll({ works });
      let result: State = reducer(initialState, action);
      action = WorkActions.clearAll();
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
