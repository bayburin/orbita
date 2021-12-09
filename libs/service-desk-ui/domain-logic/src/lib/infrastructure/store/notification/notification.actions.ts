import { createAction, props } from '@ngrx/store';

import { Notification } from '../../../entities/model/notification.interface';

export const loadAll = createAction('[Notification/API] Load All');

export const loadAllSuccess = createAction(
  '[Notification/API] Load All Success',
  props<{ notifications: Notification[] }>()
);

export const loadAllFailure = createAction('[Notification/API] Load All Failure', props<{ error: any }>());

export const toggleVisibleLimit = createAction('[Notification] Toggle Visible Limit');
