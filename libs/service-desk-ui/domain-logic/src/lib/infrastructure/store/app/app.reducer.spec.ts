import { Action } from '@ngrx/store';

import * as AppActions from './app.actions';
import { State, initialState, reducer } from './app.reducer';

describe('AppReducer', () => {
  describe('init', () => {
    it('should change attributes', () => {
      const action = AppActions.appInit();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
    });
  });

  describe('loadAppSuccess', () => {
    it('should change attributes', () => {
      const action = AppActions.appInitSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
    });
  });

  describe('loadAppFailure', () => {
    it('should change attributes', () => {
      const action = AppActions.appInitFailure();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
    });
  });

  describe('detectAdBlock', () => {
    it('should change attributes', () => {
      const action = AppActions.detectAdBlock({ adBlock: true });
      const result: State = reducer(initialState, action);

      expect(result.adBlock).toBe(true);
    });
  });

  describe('loadAppVersionSuccess', () => {
    it('should change attributes', () => {
      const version = {
        version: '1.2',
        hash: 'asjdh23z',
      };
      const action = AppActions.loadAppVersionSuccess({ version });
      const result: State = reducer(initialState, action);

      expect(result.appVersion).toBe(version.version);
      expect(result.appHash).toBe(version.hash);
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
