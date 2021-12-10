import { createSelector } from '@ngrx/store';

import { NOTIFICATION_FEATURE_KEY, State, notificationAdapter, NotificationPartialState } from './notification.reducer';
import { getServiceDeskUiState } from './../index';
import { getLimitTypesValue } from '../../../entities/model/limit-types-value-model.enum';

export const getNotificationState = createSelector(
  getServiceDeskUiState,
  (state: NotificationPartialState) => state[NOTIFICATION_FEATURE_KEY]
);

const { selectAll, selectEntities } = notificationAdapter.getSelectors();

export const getLoaded = createSelector(getNotificationState, (state: State) => state.loaded);

export const getLoading = createSelector(getNotificationState, (state: State) => state.loading);

export const getLoadingNew = createSelector(getNotificationState, (state: State) => state.loadingNew);

export const getError = createSelector(getNotificationState, (state: State) => state.error);

export const getAll = createSelector(getNotificationState, (state: State) => selectAll(state));

export const getEntities = createSelector(getNotificationState, (state: State) => selectEntities(state));

export const getLimitType = createSelector(getNotificationState, (state: State) => state.limitType);

export const getUnreadNotificationCount = createSelector(
  getNotificationState,
  (state: State) => state.unreadNotificationCount
);

export const getTmpNotifications = createSelector(getNotificationState, (state: State) => state.tmpNotifications);

export const getAllLimited = createSelector(getAll, getLimitType, (notifications, limitType) =>
  notifications.splice(0, getLimitTypesValue(limitType))
);
