import { createAction, props } from '@ngrx/store';

import { Employee } from '../../../entities/models/employee/employee.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import { PrimeFilter } from '../../../entities/prime-filter.interface';

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

export const overviewSingleEmployee = createAction('[Employee] Overview Single Employee');

export const loadSingleEmployeeForOverview = createAction(
  '[Employee/API] Load Single Employee For Overview',
  props<{ idTn: number }>()
);

export const loadSingleEmployeeForOverviewSuccess = createAction(
  '[Employee/API] Load Single Employee For Overview Success',
  props<{ employee: Employee }>()
);

export const loadSingleEmployeeForOverviewNotFound = createAction(
  '[Employee/API] Load Single Employee For Overview Not Found'
);

export const loadSingleEmployeForOverviewFailure = createAction(
  '[Employee/API] Load Single Employee For Overview Failure',
  props<{ error: any }>()
);

export const setSelectedId = createAction('[Employee] Set SelectedId', props<{ idTn: number }>());

// ========== Подтип хранилища EmployeeShort ==========

export const loadAllEmployeeShort = createAction(
  '[Employee/Api] Load All Employee Short',
  props<{ filters: PrimeFilter }>()
);

export const loadAllEmployeeShortSuccess = createAction(
  '[Employee/Api] Load All Employee Short Success',
  props<{ employees: EmployeeShort[] }>()
);

export const loadAllEmployeeShortFailure = createAction(
  '[Employee/Api] Load All Employee Short Failure',
  props<{ error: any }>()
);

export const clearAllEmployeeShort = createAction('[Employee] Clear All Employee Short');

export const loadEmployeeShortForNewForm = createAction(
  '[Employee/Api] Load Employee Short For New Form',
  props<{ idTn: number; loadSvtItems?: boolean }>()
);

export const loadEmployeeShortForNewFormSuccess = createAction(
  '[Employee/Api] Load Employee Short For New Form Success',
  props<{ employees: EmployeeShort[]; loadSvtItems: boolean }>()
);

export const loadEmployeeShortForNewFormFailure = createAction(
  '[Employee/Api] Load Employee Short For New Form Failure',
  props<{ error: any }>()
);
