import { Action } from '@ngrx/store';

import { User } from './../../../entities/models/user.interface';
import * as UserActions from './user.actions';
import { State, initialState, reducer } from './user.reducer';

describe('UserReducer', () => {
  let action: Action;
  const createUserEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as User);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const users = [
        createUserEntity(1),
        createUserEntity(2)
      ];
      action = UserActions.setAll({ users });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2)
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
