import { Action } from '@ngrx/store';

import { User } from '../../../entities/models/user.interface';
import * as UserActions from './user.actions';
import { State, initialState, reducer } from './user.reducer';
import { UserQueueBuilder } from './../../builders/user-queue.builder';

describe('UserReducer', () => {
  let action: Action;
  const createUser = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as User);

  describe('loadAll', () => {
    it('should clear "loaded" and "error" attributes', () => {
      action = UserActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should set the list of known Users', () => {
      const users = [
        createUser('PRODUCT-AAA'),
        createUser('PRODUCT-zzz'),
      ];
      const userQueue = new UserQueueBuilder().users(users).build();
      action = UserActions.loadAllSuccess({ users: userQueue.users });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" attribute', () => {
      const error = { message: 'error' };
      action = UserActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
