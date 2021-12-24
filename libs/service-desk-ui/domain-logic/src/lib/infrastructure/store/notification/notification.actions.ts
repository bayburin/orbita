import { createAction, props } from '@ngrx/store';

import { Notification, TmpNotification } from '../../../entities/models/notification.interface';

export const loadAll = createAction('[Notification/API] Load All');

export const loadAllSuccess = createAction(
  '[Notification/API] Load All Success',
  props<{ notifications: Notification[] }>()
);

export const loadAllFailure = createAction('[Notification/API] Load All Failure', props<{ error: any }>());

export const loadNew = createAction('[Notification/API] Load New');

export const loadNewSuccess = createAction(
  '[Notification/API] Load New Success',
  props<{ notifications: Notification[] }>()
);

export const loadNewFailure = createAction('[Notification/API] Load New Failure', props<{ error: any }>());

export const toggleLimitType = createAction('[Notification] Toggle Limit Type');

export const addTmpNotification = createAction(
  '[Notification] Add Tmp Notification',
  props<{ notification: TmpNotification }>()
);

export const removeTmpNotification = createAction(
  '[Notification] Remove Tmp Notification',
  props<{ notification: TmpNotification }>()
);

export const setUnreadNotificationCount = createAction(
  '[Notification] Set Unread Notification Count',
  props<{ count: number }>()
);

export const increaseUnreadNotificationCount = createAction('[Notification] Increase Unread Notification Count');

export const clearUnreadNotificationCount = createAction('[Notification] Clear Unread Notification Count');
