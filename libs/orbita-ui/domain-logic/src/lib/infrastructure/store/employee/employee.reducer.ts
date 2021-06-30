import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EmployeeActions from './employee.actions';
import { Employee } from '../../../entities/models/employee/employee.interface';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loaded: boolean;
  loading: boolean;
  selectedId: number;
  error?: string | null;
}

export interface State {
  employee: EmployeeState;
}

export interface EmployeePartialState {
  readonly [EMPLOYEE_FEATURE_KEY]: State;
}

export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

export const employeeInitialState: EmployeeState = employeeAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedId: null,
  error: null,
});

export const initialState: State = {
  employee: employeeInitialState,
};

const employeeReducer = createReducer(
  initialState,
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
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return employeeReducer(state, action);
}
