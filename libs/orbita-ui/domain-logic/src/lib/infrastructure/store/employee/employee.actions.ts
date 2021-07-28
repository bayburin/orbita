import { createAction, props } from '@ngrx/store';

import { Employee } from '../../../entities/models/employee/employee.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import { SearchEmployeeKeys } from './../../../entities/search-employee-keys.enum';

// ========== Подтип хранилища Employee ==========

export const loadSingleEmployee = createAction('[Employee/API] Load Single Employee');

export const loadSingleEmployeeSuccess = createAction(
  '[Employee/API] Load Single Employee Success',
  props<{ employee: Employee }>()
);

export const loadSingleEmployeeNotFound = createAction('[Employee/API] Load Single Employee Not Found');

export const loadSingleEmployeeFailure = createAction(
  '[Employee/API] Load Single Employee Failure',
  props<{ error: any }>()
);

export const selectEmployee = createAction('[Employee] Select Employee', props<{ idTn: number }>());

export const clearSelectedEmployee = createAction('[Employee] Clear Selected Employee');

// ========== Подтип хранилища EmployeeShort ==========

export const loadAllEmployeeShort = createAction(
  '[Employee/Api] Load All Employee Short',
  props<{
    key: SearchEmployeeKeys;
    value: string;
  }>()
);

export const loadAllEmployeeShortSuccess = createAction(
  '[Employee/Api] Load All Employee Short Success',
  props<{ employees: EmployeeShort[] }>()
);

export const loadAllEmployeeShortFailure = createAction(
  '[Employee/Api] Load All Employee Short Failure',
  props<{ error: any }>()
);
