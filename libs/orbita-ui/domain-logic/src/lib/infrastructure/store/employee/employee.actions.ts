import { createAction, props } from '@ngrx/store';

import { Employee } from '../../../entities/models/employee/employee.interface';

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
