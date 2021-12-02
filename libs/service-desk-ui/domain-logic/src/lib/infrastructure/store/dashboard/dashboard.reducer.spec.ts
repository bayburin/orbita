import { Action } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { State, initialState, reducer } from './dashboard.reducer';

describe('Dashboard Reducer', () => {
  let action: Action;

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = DashboardActions.loadDashboard();
      const result: State = reducer(initialState, action);

      expect(result.loadedDashboard).toBe(false);
      expect(result.loadingDashboard).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      initialState.loadingDashboard = true;
      action = DashboardActions.loadDashboardSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loadingDashboard).toEqual(false);
      expect(result.loadedDashboard).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = DashboardActions.loadDashboardFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loadingDashboard).toEqual(false);
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
