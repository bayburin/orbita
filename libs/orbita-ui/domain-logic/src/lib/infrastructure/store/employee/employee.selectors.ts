import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  EMPLOYEE_FEATURE_KEY,
  State,
  EmployeePartialState,
  employeeAdapter,
  EmployeeState,
  employeeShortAdapter,
  EmployeeShortState,
} from './employee.reducer';

export const getEmployeeBaseState = createSelector(
  getOrbitaUiState,
  (state: EmployeePartialState) => state[EMPLOYEE_FEATURE_KEY]
);

// ========== Подтип хранилища Employee ==========

export const getEmployeeState = createSelector(getEmployeeBaseState, (state: State) => state.employee);

const { selectAll: selectAllEmployee, selectEntities: selectEntitiesEmployee } = employeeAdapter.getSelectors();

export const getEmployeeLoading = createSelector(getEmployeeState, (state: EmployeeState) => state.loading);

export const getEmployeeLoaded = createSelector(getEmployeeState, (state: EmployeeState) => state.loaded);

export const getEmployeeError = createSelector(getEmployeeState, (state: EmployeeState) => state.error);

export const getEmployeeAll = createSelector(getEmployeeState, (state: EmployeeState) => selectAllEmployee(state));

export const getEmployeeEntities = createSelector(getEmployeeState, (state: EmployeeState) =>
  selectEntitiesEmployee(state)
);

export const getEmployeeSelectedId = createSelector(getEmployeeState, (state: EmployeeState) => state.selectedId);

export const getEmployeeSelected = createSelector(
  getEmployeeEntities,
  getEmployeeSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

// ========== Подтип хранилища EmployeeShort ==========

export const getEmployeeShortState = createSelector(getEmployeeBaseState, (state: State) => state.employeeShort);

const { selectAll: selectAllEmployeeShort, selectEntities: selectEntitiesEmployeeShort } =
  employeeShortAdapter.getSelectors();

export const getEmployeeShortLoading = createSelector(
  getEmployeeShortState,
  (state: EmployeeShortState) => state.loading
);

export const getEmployeeShortLoaded = createSelector(
  getEmployeeShortState,
  (state: EmployeeShortState) => state.loaded
);

export const getEmployeeShortError = createSelector(getEmployeeShortState, (state: EmployeeShortState) => state.error);

export const getEmployeeShortAll = createSelector(getEmployeeShortState, (state: EmployeeShortState) =>
  selectAllEmployeeShort(state)
);

export const getEmployeeShortEntities = createSelector(getEmployeeShortState, (state: EmployeeShortState) =>
  selectEntitiesEmployeeShort(state)
);
