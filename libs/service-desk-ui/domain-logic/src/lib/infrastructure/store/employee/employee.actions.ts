import { createAction, props } from '@ngrx/store';

import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';

export const loadAll = createAction('[Employee/Api] Load All', props<{ tns: number[] }>());

export const loadAllSuccess = createAction('[Employee/Api] Load All Success', props<{ employees: EmployeeShort[] }>());

export const loadAllFailure = createAction('[Employee/Api] Load All Failure', props<{ error: any }>());
