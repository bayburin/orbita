import { Action } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { State, initialState, reducer } from './dashboard.reducer';

describe('Dashboard Reducer', () => {
  let action: Action;

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = DashboardActions.loadDashboard();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = DashboardActions.loadDashboardSuccess({ categoryIds: [1, 2], serviceIds: [3, 4] });
      const result: State = reducer(initialState, action);

      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
      expect(result.categoryIds).toEqual([1, 2]);
      expect(result.serviceIds).toEqual([3, 4]);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = DashboardActions.loadDashboardFailure({ error });
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
