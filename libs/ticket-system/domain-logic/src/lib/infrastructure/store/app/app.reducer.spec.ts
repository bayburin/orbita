import { Action } from '@ngrx/store';

import * as AppActions from './app.actions';
import { State, initialState, reducer } from './app.reducer';

describe('App Reducer', () => {
  let action: Action;

  describe('init()', () => {
    it('should change "loaded", "loading" and "error" attributes', () => {
      action = AppActions.init();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBe(null);
    });
  });

  describe('loadAppSuccess()', () => {
    it('should change "loaded" and "loading" attributes', () => {
      action = AppActions.loadAppSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
    });
  });

  describe('loadAppFailure()', () => {
    it('should change "loading" and "error" attributes', () => {
      const error = { message: 'test message' };
      action = AppActions.loadAppFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
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
