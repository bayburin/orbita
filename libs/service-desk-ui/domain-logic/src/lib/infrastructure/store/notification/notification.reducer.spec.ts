import { Action } from '@ngrx/store';

import { Notification } from '../../../entities/model/notification.interface';
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
      action = NotificationActions.toggleVisibleLimit();
      let result: State = reducer(initialState, action);
      expect(result.visibleLimit).toBe(25);
      action = NotificationActions.toggleVisibleLimit();
      result = reducer(result, action);
      expect(result.visibleLimit).toBe(5);
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
