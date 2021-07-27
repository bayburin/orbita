import { Action } from '@ngrx/store';

import { Employee } from '../../../entities/models/employee/employee.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import * as EmployeeActions from './employee.actions';
import { initialState, reducer, EmployeeState, EmployeeShortState, State } from './employee.reducer';

describe('EmployeeReducer', () => {
  let action: Action;
  const createEmployeeEntity = (id: number, name = '') =>
    ({
      id,
      lastName: name || `name-${id}`,
    } as unknown as Employee);
  const createEmployeeShortEntity = (id: number, name = '') =>
    ({
      id,
      lastName: name || `name-${id}`,
    } as unknown as EmployeeShort);

  // ========== Подтип хранилища Employee ==========

  describe('loadSingleEmployee', () => {
    it('should change attributes', () => {
      action = EmployeeActions.loadSingleEmployee();
      const result: EmployeeState = reducer(initialState, action).employee;

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(0);
    });
  });

  describe('loadSingleEmployeeSuccess', () => {
    it('should change attributes', () => {
      const employee = createEmployeeEntity(1);
      action = EmployeeActions.loadSingleEmployeeSuccess({ employee });
      const result: EmployeeState = reducer(initialState, action).employee;

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(1);
      expect(result.ids[0]).toBe(employee.id);
    });
  });

  describe('loadSingleEmployeeNotFound', () => {
    it('should change attributes', () => {
      action = EmployeeActions.loadSingleEmployeeNotFound();
      const result: EmployeeState = reducer(initialState, action).employee;

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(0);
    });
  });

  describe('loadSingleEmployeeFailure', () => {
    it('should change attributes', () => {
      const error = 'error message';
      action = EmployeeActions.loadSingleEmployeeFailure({ error });
      const result: EmployeeState = reducer(initialState, action).employee;

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toEqual(error);
      expect(result.ids.length).toBe(0);
    });
  });

  describe('selectEmployee', () => {
    it('should change attributes', () => {
      action = EmployeeActions.selectEmployee({ idTn: 12 });
      const result: EmployeeState = reducer(initialState, action).employee;

      expect(result.selectedId).toBe(12);
    });
  });

  describe('clearSelectedEmployee', () => {
    it('should change attributes', () => {
      action = EmployeeActions.clearSelectedEmployee();
      const result: EmployeeState = reducer(initialState, action).employee;

      expect(result.loaded).toBe(false);
      expect(result.selectedId).toBe(null);
    });
  });

  // ========== Подтип хранилища EmployeeShort ==========

  describe('loadAllEmployeeShort', () => {
    it('should change attributes', () => {
      const employees = [createEmployeeShortEntity(1), createEmployeeShortEntity(2)];
      action = EmployeeActions.loadAllEmployeeShortSuccess({ employees });
      const partialResult: State = reducer(initialState, action);
      action = EmployeeActions.loadAllEmployeeShort();
      const result: EmployeeShortState = reducer(partialResult, action).employeeShort;

      expect(result.ids.length).toBe(0);
      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllEmployeeShortSuccess', () => {
    it('should change attributes', () => {
      const employees = [createEmployeeShortEntity(1), createEmployeeShortEntity(2)];
      action = EmployeeActions.loadAllEmployeeShortSuccess({ employees });
      const result: EmployeeShortState = reducer(initialState, action).employeeShort;

      expect(result.ids).toEqual([1, 2]);
      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
    });
  });

  describe('loadAllEmployeeShortFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      action = EmployeeActions.loadAllEmployeeShortFailure({ error });
      const result: EmployeeShortState = reducer(initialState, action).employeeShort;

      expect(result.ids.length).toBe(0);
      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
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
