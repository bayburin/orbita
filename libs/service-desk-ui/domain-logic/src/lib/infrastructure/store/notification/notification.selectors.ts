import { createSelector } from '@ngrx/store';

import { NOTIFICATION_FEATURE_KEY, State, notificationAdapter, NotificationPartialState } from './notification.reducer';
import { getServiceDeskUiState } from './../index';

export const getNotificationState = createSelector(
  getServiceDeskUiState,
  (state: NotificationPartialState) => state[NOTIFICATION_FEATURE_KEY]
);

const { selectAll, selectEntities } = notificationAdapter.getSelectors();

export const getLoaded = createSelector(getNotificationState, (state: State) => state.loaded);

export const getLoading = createSelector(getNotificationState, (state: State) => state.loading);

export const getError = createSelector(getNotificationState, (state: State) => state.error);

export const getAll = createSelector(getNotificationState, (state: State) => selectAll(state));

export const getEntities = createSelector(getNotificationState, (state: State) => selectEntities(state));

export const getVisibleLimit = createSelector(getNotificationState, (state: State) => state.visibleLimit);

export const getUnreadNotificationCount = createSelector(
  getNotificationState,
  (state: State) => state.unreadNotificationCount
);

export const getTmpNotifications = createSelector(getNotificationState, (state: State) => state.tmpNotifications);
