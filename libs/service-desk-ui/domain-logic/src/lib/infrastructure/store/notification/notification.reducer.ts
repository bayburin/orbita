import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NotificationActions from './notification.actions';
import { Notification, TmpNotification } from '../../../entities/models/notification.interface';
import { LimitTypes } from '../../../entities/models/notification.interface';

export const NOTIFICATION_FEATURE_KEY = 'notification';

export interface State extends EntityState<Notification> {
  loading: boolean;
  loaded: boolean;
  // Индикатор загрузки непрочитанных уведомлений
  loadingNew: boolean;
  // Ограничение списка уведомлений
  limitType: LimitTypes;
  // Число непрочитанных сообщений
  unreadNotificationCount: number;
  // Массив временных сообщений
  tmpNotifications: TmpNotification[];
  error?: string | null;
  errorNew?: string | null;
}

export interface NotificationPartialState {
  readonly [NOTIFICATION_FEATURE_KEY]: State;
}

export const notificationAdapter: EntityAdapter<Notification> = createEntityAdapter<Notification>({
  sortComparer: (a: Notification, b: Notification) => (a.id > b.id ? -1 : 1),
});

export const initialState: State = notificationAdapter.getInitialState({
  loading: false,
  loaded: false,
  loadingNew: false,
  limitType: LimitTypes.LIMITED,
  unreadNotificationCount: 0,
  tmpNotifications: [],
});

const notificationReducer = createReducer(
  initialState,
  on(NotificationActions.loadAll, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(NotificationActions.loadAllSuccess, (state, { notifications }) =>
    notificationAdapter.setAll(notifications, { ...state, loaded: true, loading: false })
  ),
  on(NotificationActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(NotificationActions.loadNew, (state) => ({ ...state, loadingNew: true, errorNew: null })),
  on(NotificationActions.loadNewSuccess, (state, { notifications }) =>
    notificationAdapter.addMany(notifications, { ...state, loadingNew: false })
  ),
  on(NotificationActions.loadNewFailure, (state, { error }) => ({ ...state, loadingNew: false, errorNew: error })),
  on(NotificationActions.toggleLimitType, (state) => ({
    ...state,
    limitType: state.limitType === LimitTypes.LIMITED ? LimitTypes.FULL : LimitTypes.LIMITED,
  })),
  on(NotificationActions.addTmpNotification, (state, { notification }) => ({
    ...state,
    tmpNotifications: [notification, ...state.tmpNotifications],
  })),
  on(NotificationActions.removeTmpNotification, (state, { notification }) => ({
    ...state,
    tmpNotifications: state.tmpNotifications.filter((el) => el !== notification),
  })),
  on(NotificationActions.setUnreadNotificationCount, (state, { count }) => ({
    ...state,
    unreadNotificationCount: count,
  })),
  on(NotificationActions.increaseUnreadNotificationCount, (state) => ({
    ...state,
    unreadNotificationCount: state.unreadNotificationCount + 1,
  })),
  on(NotificationActions.clearUnreadNotificationCount, (state) => ({
    ...state,
    unreadNotificationCount: 0,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return notificationReducer(state, action);
}
