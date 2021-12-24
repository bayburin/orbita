import { Action } from '@ngrx/store';

import * as DeepSearchActions from './deep-search.actions';
import { State, initialState, reducer } from './deep-search.reducer';

describe('DeepSearch Reducer', () => {
  let action: Action;

  describe('search', () => {
    it('should change attributes', () => {
      action = DeepSearchActions.search();
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
      expect(result.categoryIds).toEqual([]);
      expect(result.serviceIds).toEqual([]);
      expect(result.questionIds).toEqual([]);
    });
  });

  describe('searchSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = DeepSearchActions.searchSuccess({
        categoryIds: [1, 2],
        serviceIds: [3, 4],
        questionIds: [5, 6],
      });
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeUndefined();
      expect(result.categoryIds).toEqual([1, 2]);
      expect(result.serviceIds).toEqual([3, 4]);
      expect(result.questionIds).toEqual([5, 6]);
    });
  });

  describe('searchFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      initialState.loading = true;
      action = DeepSearchActions.searchFailure({ error });
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
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
