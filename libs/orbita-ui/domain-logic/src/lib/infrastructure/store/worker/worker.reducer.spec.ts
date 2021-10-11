import { Action } from '@ngrx/store';

import { Worker } from './../../../entities/models/worker.interface';
import * as WorkerActions from './worker.actions';
import { State, initialState, reducer } from './worker.reducer';

describe('WorkerReducer', () => {
  let action: Action;
  const createWorkerEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Worker);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const workers = [createWorkerEntity(1), createWorkerEntity(2)];
      action = WorkerActions.setAll({ workers });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const workers = [createWorkerEntity(1), createWorkerEntity(2)];
      action = WorkerActions.setAll({ workers });
      let result: State = reducer(initialState, action);
      action = WorkerActions.clearAll();
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
