import { createAction, props } from '@ngrx/store';

import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';

export const loadAll = createAction('[Employee/Api] Load All', props<{ tns: number[] }>());

export const loadAllSuccess = createAction('[Employee/Api] Load All Success', props<{ employees: EmployeeShort[] }>());

export const loadAllFailure = createAction('[Employee/Api] Load All Failure', props<{ error: any }>());

export const search = createAction('[Employee/Api] Search', props<{ key: string; value: string }>());

export const searchStart = createAction(
  '[Employee/Api] Search Start',
  props<{ ids: number[]; key: string; value: string }>()
);

export const searchSuccess = createAction('[Employee/Api] Search Success', props<{ employees: EmployeeShort[] }>());

export const searchFailure = createAction('[Employee/Api] Search Failure', props<{ error: any }>());
