import { Action } from '@ngrx/store';

import * as ServiceActions from './service.actions';
import { Service } from '../../../entities/models/service.interface';
import { State, initialState, reducer } from './service.reducer';

describe('ServiceReducer', () => {
  let action: Action;
  const createService = (id: number, name = '', categoryId = 0): Service =>
    ({
      id,
      category_id: categoryId,
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

  // ========== Администрирование ==========

  describe('adminLoadAll', () => {
    it('should change attributes', () => {
      action = ServiceActions.adminLoadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('adminLoadAllSuccess', () => {
    it('should change attributes', () => {
      const entities = { 111: createService(111), 222: createService(222) };
      initialState.loading = true;
      action = ServiceActions.adminLoadAllSuccess({ entities, ids: [111, 222] });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('adminLoadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = ServiceActions.adminLoadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('adminDestroyWithDestroyedCategory', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.entities = { 1: createService(1, 'service 1', 2), 2: createService(2, 'service 2', 3) };
      initialState.ids = [1, 2];
      action = ServiceActions.adminDestroyWithDestroyedCategory({ categoryId: 3 });
      const result: State = reducer(initialState, action);

      expect(result.ids).toEqual([1]);
    });
  });

  // ========== Форма рекомендаций для пользователя ==========

  describe('adminInitForm', () => {
    it('should change attributes', () => {
      const service = createService(1, 'test');
      action = ServiceActions.adminInitForm({ service });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(service);
      expect(result.form.displayForm).toBe(true);
    });
  });

  describe('adminCloseForm', () => {
    it('should change attributes', () => {
      action = ServiceActions.adminCloseForm();
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBeNull();
      expect(result.form.displayForm).toBe(false);
      expect(result.form.formData).toBeNull();
    });
  });

  describe('adminChangeForm', () => {
    it('should change attributes', () => {
      const formData = createService(1, 'test');
      action = ServiceActions.adminChangeForm({ formData });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(formData);
    });
  });

  describe('adminSaveForm', () => {
    it('should change attributes', () => {
      action = ServiceActions.adminSaveForm();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(true);
      expect(result.form.error).toBe(null);
    });
  });

  describe('adminSaveFormSuccess', () => {
    it('should change attributes', () => {
      const service = createService(1, 'test');
      initialState.ids = [];
      initialState.entities = {};
      initialState.form.formData = service;
      action = ServiceActions.adminSaveFormSuccess({ service });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.form.loading).toBe(false);
    });
  });

  describe('adminSaveFormFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = ServiceActions.adminSaveFormFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(false);
      expect(result.form.error).toEqual(error);
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
