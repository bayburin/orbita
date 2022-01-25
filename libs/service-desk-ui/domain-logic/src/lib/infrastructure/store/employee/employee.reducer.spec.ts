import { Action } from '@ngrx/store';

import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import { State, initialState, reducer } from './employee.reducer';
import * as EmployeeActions from './employee.actions';

describe('EmployeeReducer', () => {
  let action: Action;
  const createEmployeeShortEntity = (id: number, name = '') =>
    ({
      personnelNo: id,
      lastName: name || `name-${id}`,
    } as unknown as EmployeeShort);

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = EmployeeActions.loadAll({ tns: [1, 2, 3] });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const employees = [createEmployeeShortEntity(1), createEmployeeShortEntity(2)];
      action = EmployeeActions.loadAllSuccess({ employees });
      const result: State = reducer(initialState, action);

      expect(result.ids).toEqual([1, 2]);
      expect(result.loading).toBe(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      action = EmployeeActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(0);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('loadMany', () => {
    it('should change attributes', () => {
      action = EmployeeActions.loadMany({ tns: [1, 2, 3] });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadManySuccess', () => {
    it('should change attributes', () => {
      const employees = [createEmployeeShortEntity(1), createEmployeeShortEntity(2)];
      action = EmployeeActions.loadManySuccess({ employees });
      const result: State = reducer(initialState, action);

      expect(result.ids).toEqual([1, 2]);
      expect(result.loading).toBe(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadManyFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      action = EmployeeActions.loadManyFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(0);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('searchStart', () => {
    it('should change attributes', () => {
      action = EmployeeActions.searchStart({ ids: [1, 2], key: 'fio', value: 'fake-fio' });
      initialState.searchIds = [1, 2];
      const result: State = reducer(initialState, action);

      expect(result.searchIds).toEqual([]);
      expect(result.loading).toBe(true);
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('searchSuccess', () => {
    it('should change attributes', () => {
      const employees = [createEmployeeShortEntity(1), createEmployeeShortEntity(2)];
      action = EmployeeActions.searchSuccess({ employees });
      const result: State = reducer(initialState, action);

      expect(result.ids).toEqual([1, 2]);
      expect(result.searchIds).toEqual([1, 2]);
      expect(result.loading).toBe(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('searchFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      action = EmployeeActions.searchFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(0);
      expect(result.loading).toBe(false);
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
