import { Action } from '@ngrx/store';

import { LimitTypes, Notification, TmpNotification } from '../../../entities/model/notification.interface';
import * as NotificationActions from './notification.actions';
import { State, initialState, reducer } from './notification.reducer';

describe('NotificationReducer', () => {
  let action: Action;
  const createNotification = (id: number, message = ''): Notification =>
    ({
      id,
      body: { message: message || `message-${id}` },
    } as Notification);

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = NotificationActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const notifications = [createNotification(111), createNotification(222)];
      initialState.loading = true;
      action = NotificationActions.loadAllSuccess({ notifications });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = NotificationActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('setVisibleLimit', () => {
    it('should change attributes', () => {
      action = NotificationActions.toggleLimitType();
      let result: State = reducer(initialState, action);
      expect(result.limitType).toBe(LimitTypes.FULL);
      action = NotificationActions.toggleLimitType();
      result = reducer(result, action);
      expect(result.limitType).toBe(LimitTypes.LIMITED);
    });
  });

  describe('addTmpNotification', () => {
    it('should change attributes', () => {
      const notification = { message: 'fake' } as TmpNotification;
      action = NotificationActions.addTmpNotification({ notification });
      const result: State = reducer(initialState, action);

      expect(result.tmpNotifications).toEqual([notification]);
    });
  });

  describe('removeTmpNotification', () => {
    it('should change attributes', () => {
      const notification1 = { message: 'fake-1' } as TmpNotification;
      const notification2 = { message: 'fake-2' } as TmpNotification;
      const notifications = [notification1, notification2];
      initialState.tmpNotifications = notifications;
      action = NotificationActions.removeTmpNotification({ notification: notification1 });
      const result: State = reducer(initialState, action);

      expect(result.tmpNotifications).toEqual([notification2]);
    });
  });

  describe('setUnreadNotificationCount', () => {
    it('should change attributes', () => {
      action = NotificationActions.setUnreadNotificationCount({ count: 25 });
      const result: State = reducer(initialState, action);

      expect(result.unreadNotificationCount).toBe(25);
    });
  });

  describe('increaseUnreadNotificationCount', () => {
    it('should change attributes', () => {
      action = NotificationActions.increaseUnreadNotificationCount();
      const result: State = reducer(initialState, action);

      expect(result.unreadNotificationCount).toBe(1);
    });
  });

  describe('clearUnreadNotificationCount', () => {
    it('should change attributes', () => {
      initialState.unreadNotificationCount = 10;
      action = NotificationActions.clearUnreadNotificationCount();
      const result: State = reducer(initialState, action);

      expect(result.unreadNotificationCount).toBe(0);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
