import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NotificationActions from './notification.actions';
import { Notification, TmpNotification } from '../../../entities/model/notification.interface';

export const NOTIFICATION_FEATURE_KEY = 'notification';

export interface State extends EntityState<Notification> {
  loading: boolean;
  loaded: boolean;
  // Лимит уведомлений в истории уведомлений
  visibleLimit: number;
  // Число непрочитанных сообщений
  unreadNotificationCount: number;
  // Массив временных сообщений
  tmpNotifications: TmpNotification[];
  error?: string | null;
}

export interface NotificationPartialState {
  readonly [NOTIFICATION_FEATURE_KEY]: State;
}

export const notificationAdapter: EntityAdapter<Notification> = createEntityAdapter<Notification>();

export const initialState: State = notificationAdapter.getInitialState({
  loading: false,
  loaded: false,
  visibleLimit: 5,
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
  on(NotificationActions.toggleVisibleLimit, (state) => ({
    ...state,
    visibleLimit: state.visibleLimit === 5 ? 25 : 5,
  })),
  on(NotificationActions.addTmpNotification, (state, { notification }) => ({
    ...state,
    tmpNotifications: [notification, ...state.tmpNotifications],
  })),
  on(NotificationActions.removeTmpNotification, (state, { notification }) => ({
    ...state,
    tmpNotifications: state.tmpNotifications.filter((el) => el !== notification),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return notificationReducer(state, action);
}
