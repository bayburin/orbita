import { Action } from '@ngrx/store';

import * as KaseActions from './kase.actions';
import { Kase } from './../../../entities/model/kase.interface';
import { State, initialState, reducer } from './kase.reducer';
import { KaseStatus } from '../../../entities/model/kase-status.interface';

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
      action = KaseActions.loadAll({ statusId: null });
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
      const statuses = [{ id: 1 }, { id: 2 }] as KaseStatus[];
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

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
