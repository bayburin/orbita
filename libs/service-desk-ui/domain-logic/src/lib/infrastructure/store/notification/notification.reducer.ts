import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NotificationActions from './notification.actions';
import { Notification } from '../../../entities/model/notification.interface';

export const NOTIFICATION_FEATURE_KEY = 'notification';

export interface State extends EntityState<Notification> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface NotificationPartialState {
  readonly [NOTIFICATION_FEATURE_KEY]: State;
}

export const notificationAdapter: EntityAdapter<Notification> = createEntityAdapter<Notification>();

export const initialState: State = notificationAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const notificationReducer = createReducer(
  initialState,
  on(NotificationActions.loadAll, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(NotificationActions.loadAllSuccess, (state, { notifications }) =>
    notificationAdapter.setAll(notifications, { ...state, loaded: true, loading: false })
  ),
  on(NotificationActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return notificationReducer(state, action);
}
