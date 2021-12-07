import { createAction, props } from '@ngrx/store';

export const loadDashboard = createAction('[Dashboard/API] Load Dashboard');

export const loadDashboardSuccess = createAction(
  '[Dashboard/API] Load Dashboard Success',
  props<{ categoryIds: number[]; serviceIds: number[] }>()
);

export const loadDashboardFailure = createAction('[Dashboard/API] Load Dashboard Failure', props<{ error: any }>());
