import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EmployeeActions from './employee.actions';
import { Employee } from '../../../entities/models/employee/employee.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loaded: boolean;
  loading: boolean;
  selectedId: number;
  error?: string | null;
}

export interface EmployeeShortState extends EntityState<EmployeeShort> {
  loaded: boolean;
  loading: boolean;
  error?: string | null;
}

export interface State {
  employee: EmployeeState;
  employeeShort: EmployeeShortState;
}

export interface EmployeePartialState {
  readonly [EMPLOYEE_FEATURE_KEY]: State;
}

export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

export const employeeShortAdapter: EntityAdapter<EmployeeShort> = createEntityAdapter<EmployeeShort>();

export const employeeInitialState: EmployeeState = employeeAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedId: null,
  error: null,
});

export const employeeShortInitialState: EmployeeShortState = employeeShortAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
});

export const initialState: State = {
  employee: employeeInitialState,
  employeeShort: employeeShortInitialState,
};

const employeeReducer = createReducer(
  initialState,

  // ========== Подтип хранилища Employee ==========

  on(EmployeeActions.loadSingleEmployee, (state) => ({
    ...state,
    employee: employeeAdapter.removeAll({ ...state.employee, loading: true, loaded: false, error: null }),
  })),
  on(EmployeeActions.loadSingleEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employee: employeeAdapter.setOne(employee, { ...state.employee, loaded: true, loading: false }),
  })),
  on(EmployeeActions.loadSingleEmployeeNotFound, (state) => ({
    ...state,
    employee: {
      ...state.employee,
      loading: false,
      loaded: false,
    },
  })),
  on(EmployeeActions.loadSingleEmployeeFailure, (state, { error }) => ({
    ...state,
    employee: {
      ...state.employee,
      loading: false,
      error,
    },
  })),
  on(EmployeeActions.selectEmployee, (state, { idTn }) => ({
    ...state,
    employee: {
      ...state.employee,
      selectedId: idTn,
    },
  })),
  on(EmployeeActions.clearSelectedEmployee, (state) => ({
    ...state,
    employee: {
      ...state.employee,
      loaded: false,
      selectedId: null,
    },
  })),

  // ========== Подтип хранилища EmployeeShort ==========

  on(EmployeeActions.loadAllEmployeeShort, (state) => ({
    ...state,
    employeeShort: employeeShortAdapter.removeAll({
      ...state.employeeShort,
      loaded: false,
      loading: true,
      error: null,
    }),
  })),
  on(EmployeeActions.loadAllEmployeeShortSuccess, (state, { employees }) => ({
    ...state,
    employeeShort: employeeShortAdapter.setAll(employees, { ...state.employeeShort, loaded: true, loading: false }),
  })),
  on(EmployeeActions.loadAllEmployeeShortFailure, (state, { error }) => ({
    ...state,
    employeeShort: {
      ...state.employeeShort,
      loaded: false,
      loading: false,
      error,
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return employeeReducer(state, action);
}
