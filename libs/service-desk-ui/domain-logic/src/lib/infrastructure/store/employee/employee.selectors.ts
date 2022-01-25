import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { EMPLOYEE_FEATURE_KEY, State, EmployeePartialState, employeeAdapter } from './employee.reducer';
import { EmployeeShort } from '../../../entities/models/employee/employee-short.interface';

export const getEmployeeState = createSelector(
  getServiceDeskUiState,
  (state: EmployeePartialState) => state[EMPLOYEE_FEATURE_KEY]
);

const { selectAll, selectEntities } = employeeAdapter.getSelectors();

export const getIds = createSelector(getEmployeeState, (state: State) => state.ids);

export const getLoading = createSelector(getEmployeeState, (state: State) => state.loading);

export const getLoaded = createSelector(getEmployeeState, (state: State) => state.loaded);

export const getError = createSelector(getEmployeeState, (state: State) => state.error);

export const getSearchIds = createSelector(getEmployeeState, (state: State) => state.searchIds);

export const getAll = createSelector(getEmployeeState, (state: State) => selectAll(state));

export const getEntities = createSelector(getEmployeeState, (state: State) => selectEntities(state));

export const getSearched = createSelector(getSearchIds, getEntities, (ids, entities): EmployeeShort[] =>
  ids.reduce((acc, id) => {
    if (!entities) {
      return acc;
    }

    acc.push(entities[id]);

    return acc;
  }, [])
);
