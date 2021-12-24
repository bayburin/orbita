import { Action } from '@ngrx/store';

import * as ServiceActions from './service.actions';
import { Service } from '../../../entities/models/service.interface';
import { State, initialState, reducer } from './service.reducer';

describe('Service Reducer', () => {
  let action: Action;
  const createService = (id: number, name = ''): Service =>
    ({
      id,
      name: name || `name-${id}`,
    } as Service);

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createService(111), 222: createService(222) };
      action = ServiceActions.setEntities({ entities });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('loadSelected', () => {
    it('should change attributes', () => {
      action = ServiceActions.loadSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should change attributes', () => {
      const service = createService(111);
      initialState.loading = true;
      action = ServiceActions.loadSelectedSuccess({ service });
      const result: State = reducer(initialState, action);

      expect(result.entities[service.id]).toEqual(service);
      expect(result.selectedId).toEqual(service.id);
      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      initialState.loading = true;
      action = ServiceActions.loadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('setAll', () => {
    it('should change attributes', () => {
      const services = [createService(111), createService(222)];
      action = ServiceActions.setAll({ services });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
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
