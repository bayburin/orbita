import { Action } from '@ngrx/store';

import { State, initialState, reducer } from './host.reducer';
import * as HostActions from './host.actions';
import { Host } from './../../../entities/models/host.interface';

describe('HostReducer', () => {
  let action: Action;
  const createHostEntity = (id: string, mac = '') =>
    ({
      id,
      mac: mac || `mac-${id}`,
    } as unknown as Host);

  describe('loadForEmployee', () => {
    it('should set attributes', () => {
      action = HostActions.loadForEmployee({ tn: 123 });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelected', () => {
    it('should set attributes', () => {
      action = HostActions.loadSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadForEmployeeSuccess', () => {
    it('should set attributes', () => {
      const hosts = [createHostEntity('111'), createHostEntity('222')];
      action = HostActions.loadForEmployeeSuccess({ hosts });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(2);
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should set attributes', () => {
      const host = createHostEntity('111');
      action = HostActions.loadSelectedSuccess({ host });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids[0]).toBe(host.id);
    });
  });

  describe('loadSelectedNotFound', () => {
    it('should set attributes', () => {
      action = HostActions.loadSelectedNotFound();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(0);
    });
  });

  describe('loadForEmployeeFailure', () => {
    it('should set attributes', () => {
      const error = 'error message';
      action = HostActions.loadForEmployeeFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should set attributes', () => {
      const error = 'error message';
      action = HostActions.loadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('select', () => {
    it('should set attributes', () => {
      action = HostActions.select({ inventNum: 'AAA' });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe('aaa');
    });

    it('should set null to selectedId if inventNum does not exist', () => {
      action = HostActions.select({ inventNum: null });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe(null);
    });
  });

  describe('clearSelected', () => {
    it('should set attributes', () => {
      action = HostActions.clearSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.selectedId).toBeNull();
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
