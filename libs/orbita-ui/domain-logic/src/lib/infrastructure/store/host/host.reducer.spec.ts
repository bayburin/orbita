import { Action } from '@ngrx/store';

import { State, initialState, reducer } from './host.reducer';
import * as HostActions from './host.actions';
import { Host } from './../../../entities/models/host.interface';

describe('HostReducer', () => {
  let action: Action;
  const createHostEntity = (id: string, mac = '') =>
    (({
      id,
      mac: mac || `mac-${id}`,
    } as unknown) as Host);

  describe('loadSelected', () => {
    it('should set attributes', () => {
      action = HostActions.loadSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
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
      expect(result.ids.length).toBe(0);
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

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
