import { Action } from '@ngrx/store';

import * as AdminHomeActions from './admin-home.actions';
import { State, initialState, reducer } from './admin-home.reducer';

describe('HomeReducer', () => {
  let action: Action;

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = AdminHomeActions.loadHome();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = AdminHomeActions.loadHomeSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = AdminHomeActions.loadHomeFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
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
