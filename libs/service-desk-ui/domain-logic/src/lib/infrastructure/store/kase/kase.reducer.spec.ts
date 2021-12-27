import { Action } from '@ngrx/store';

import * as KaseActions from './kase.actions';
import { Kase } from './../../../entities/model/kase.interface';
import { State, initialState, reducer } from './kase.reducer';
import { Filter } from '../../../entities/filter.interface';

describe('KaseReducer', () => {
  let action: Action;
  const createKase = (case_id: number, desc = ''): Kase =>
    ({
      case_id,
      desc: desc || `desc-${case_id}`,
    } as Kase);

  describe('init', () => {
    it('should change attributes', () => {
      action = KaseActions.init();
      const result: State = reducer(initialState, action);

      expect(result.initLoading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = KaseActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const kases = [createKase(111), createKase(222)];
      initialState.loading = true;
      action = KaseActions.loadAllSuccess({ kases });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.initLoading).toBe(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      initialState.initLoading = true;
      action = KaseActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
      expect(result.initLoading).toBe(false);
    });
  });

  describe('setStatuses', () => {
    it('should change attributes', () => {
      const statuses = [{ id: 1 }, { id: 2 }] as Filter[];
      action = KaseActions.setStatuses({ statuses });
      const result: State = reducer(initialState, action);

      expect(result.statuses).toEqual(statuses);
    });
  });

  describe('setServiceIds', () => {
    it('should change attributes', () => {
      const serviceIds = [1, 2, 3];
      action = KaseActions.setServiceIds({ serviceIds });
      const result: State = reducer(initialState, action);

      expect(result.serviceIds).toEqual(serviceIds);
    });
  });

  describe('revoke', () => {
    it('should change attributes', () => {
      action = KaseActions.revoke({ caseId: 123 });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
    });
  });

  describe('revokeSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = KaseActions.revokeSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('revokeFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      action = KaseActions.revokeFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('setSelectedStatusId', () => {
    it('should change attributes', () => {
      action = KaseActions.setSelectedStatusId({ selectedStatusId: 12345 });
      const result: State = reducer(initialState, action);

      expect(result.selectedStatusId).toBe(12345);
    });
  });

  describe('vote', () => {
    it('should change attributes', () => {
      action = KaseActions.vote({ caseId: 123, rating: 456 });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
    });
  });

  describe('voteSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = KaseActions.voteSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('voteFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      action = KaseActions.voteFailure({ error });
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
