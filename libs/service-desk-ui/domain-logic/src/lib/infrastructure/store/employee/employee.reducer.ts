import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EmployeeActions from './employee.actions';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface State extends EntityState<EmployeeShort> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface EmployeePartialState {
  readonly [EMPLOYEE_FEATURE_KEY]: State;
}

export const employeeAdapter: EntityAdapter<EmployeeShort> = createEntityAdapter<EmployeeShort>({
  selectId: (employee: EmployeeShort) => employee.personnelNo,
});

export const initialState: State = employeeAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadAll, (state) => ({ ...state, loading: true, loaded: false, error: null })),
  on(EmployeeActions.loadAllSuccess, (state, { employees }) =>
    employeeAdapter.setAll(employees, { ...state, loading: false, loaded: true })
  ),
  on(EmployeeActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return employeeReducer(state, action);
}
