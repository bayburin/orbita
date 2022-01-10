import { DeepSearchFilterTypes } from './../../../entities/filter.interface';
import { Action } from '@ngrx/store';

import * as DeepSearchActions from './deep-search.actions';
import { State, initialState, reducer } from './deep-search.reducer';

describe('DeepSearch Reducer', () => {
  let action: Action;

  describe('searchStart', () => {
    it('should change attributes', () => {
      action = DeepSearchActions.searchStart({ term: 'fake' });
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
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

  describe('setSelectedResultTypeId', () => {
    it('should change attributes', () => {
      action = DeepSearchActions.setSelectedResultTypeId({ selectedResultTypeId: DeepSearchFilterTypes.CATEGORY });
      const result: State = reducer(initialState, action);

      expect(result.selectedResultTypeId).toBe(DeepSearchFilterTypes.CATEGORY);
    });
  });

  describe('clearResult', () => {
    it('should change attributes', () => {
      initialState.loaded = true;
      initialState.categoryIds = [1, 2];
      initialState.serviceIds = [3, 4];
      initialState.questionIds = [5, 6];
      action = DeepSearchActions.clearResult();
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.categoryIds).toEqual([]);
      expect(result.serviceIds).toEqual([]);
      expect(result.questionIds).toEqual([]);
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
