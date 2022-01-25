import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EmployeeActions from './employee.actions';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface State extends EntityState<EmployeeShort> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
  searchIds: number[];
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
  searchIds: [],
});

const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadAll, EmployeeActions.loadMany, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(EmployeeActions.loadAllSuccess, (state, { employees }) =>
    employeeAdapter.setAll(employees, { ...state, loading: false, loaded: true })
  ),
  on(
    EmployeeActions.loadAllFailure,
    EmployeeActions.loadManyFailure,
    EmployeeActions.searchFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(EmployeeActions.loadManySuccess, (state, { employees }) =>
    employeeAdapter.setMany(employees, { ...state, loading: false, loaded: true })
  ),
  on(EmployeeActions.searchStart, (state, { ids }) =>
    employeeAdapter.removeMany(ids, {
      ...state,
      searchIds: [],
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(EmployeeActions.searchSuccess, (state, { employees }) =>
    employeeAdapter.setMany(employees, {
      ...state,
      searchIds: employees.map((el) => el.personnelNo),
      loading: false,
      loaded: true,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return employeeReducer(state, action);
}
