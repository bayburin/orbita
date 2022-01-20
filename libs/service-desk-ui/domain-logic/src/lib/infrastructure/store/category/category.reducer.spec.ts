import { Action } from '@ngrx/store';

import * as CategoryActions from './category.actions';
import { Category } from '../../../entities/models/category.interface';
import { State, initialState, reducer } from './category.reducer';

describe('CategoryReducer', () => {
  let action: Action;
  const createCategory = (id: number, name = ''): Category =>
    ({
      id,
      name: name || `name-${id}`,
    } as Category);

  describe('setAll', () => {
    it('should change attributes', () => {
      const categories = [createCategory(111), createCategory(222)];
      action = CategoryActions.setAll({ categories });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = CategoryActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const categories = { 111: createCategory(111), 222: createCategory(222) };
      initialState.loading = true;
      action = CategoryActions.loadAllSuccess({ entities: categories, ids: Object.keys(categories).map(Number) });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = CategoryActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('loadSelected', () => {
    it('should change attributes', () => {
      action = CategoryActions.loadSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should change attributes', () => {
      const category = createCategory(111);
      initialState.loading = true;
      action = CategoryActions.loadSelectedSuccess({ category });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toEqual(category.id);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = CategoryActions.loadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createCategory(111), 222: createCategory(222) };
      action = CategoryActions.setEntities({ entities });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('setSelectedId', () => {
    it('should change attributes', () => {
      action = CategoryActions.setSelectedId({ selectedId: 123 });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe(123);
    });
  });

  // ========== Администрирование ==========

  describe('adminLoadAll', () => {
    it('should change attributes', () => {
      action = CategoryActions.adminLoadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('adminLoadAllSuccess', () => {
    it('should change attributes', () => {
      const categories = [createCategory(111), createCategory(222)];
      initialState.loading = true;
      action = CategoryActions.adminLoadAllSuccess({ categories });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('adminLoadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = CategoryActions.adminLoadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('adminSelect', () => {
    it('should change attributes', () => {
      action = CategoryActions.adminSelect({ id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe(1);
    });
  });

  describe('adminLoadSelected', () => {
    it('should change attributes', () => {
      initialState.selectedId = 12;
      action = CategoryActions.adminLoadSelected({ edit: true });
      const result: State = reducer(initialState, action);

      expect(result.loadingIds).toEqual([12]);
    });
  });

  describe('adminLoadSelectedSuccess', () => {
    it('should change attributes', () => {
      const category = createCategory(1);
      initialState.loadingIds = [1];
      action = CategoryActions.adminLoadSelectedSuccess({ category, edit: true });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.loadingIds).toEqual([]);
    });
  });

  describe('adminLoadSelectedFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.selectedId = 1;
      initialState.loadingIds = [1];
      action = CategoryActions.adminLoadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.selectedId).toBeNull();
      expect(result.loadingIds).toEqual([]);
    });
  });

  describe('adminDestroy', () => {
    it('should change attributes', () => {
      initialState.loadingIds = [];
      action = CategoryActions.adminDestroy({ id: 123 });
      const result: State = reducer(initialState, action);

      expect(result.loadingIds).toEqual([123]);
    });
  });

  describe('adminDestroySuccess', () => {
    it('should change attributes', () => {
      const category = createCategory(1);
      initialState.ids = [1];
      initialState.entities = { 1: category };
      initialState.loadingIds = [1];
      action = CategoryActions.adminDestroySuccess({ id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(0);
      expect(result.loadingIds).toEqual([]);
    });
  });

  describe('adminDestroyFailure', () => {
    it('should change attributes', () => {
      const category = createCategory(1);
      initialState.ids = [1];
      initialState.entities = { 1: category };
      initialState.loadingIds = [1];
      action = CategoryActions.adminDestroyFailure({ id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.loadingIds).toEqual([]);
    });
  });

  // ========== Форма рекомендаций для пользователя ==========

  describe('adminInitForm', () => {
    it('should change attributes', () => {
      const category = createCategory(1, 'test');
      action = CategoryActions.adminInitForm({ category });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(category);
      expect(result.form.displayForm).toBe(true);
    });
  });

  describe('adminCloseForm', () => {
    it('should change attributes', () => {
      action = CategoryActions.adminCloseForm();
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBeNull();
      expect(result.form.displayForm).toBe(false);
      expect(result.form.formData).toBeNull();
    });
  });

  describe('adminChangeForm', () => {
    it('should change attributes', () => {
      const formData = createCategory(1, 'test');
      action = CategoryActions.adminChangeForm({ formData });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(formData);
    });
  });

  describe('adminSaveForm', () => {
    it('should change attributes', () => {
      action = CategoryActions.adminSaveForm();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(true);
      expect(result.form.error).toBe(null);
    });
  });

  describe('adminSaveFormSuccess', () => {
    it('should change attributes', () => {
      const category = createCategory(1, 'test');
      initialState.form.formData = category;
      action = CategoryActions.adminSaveFormSuccess({ category });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.form.loading).toBe(false);
    });
  });

  describe('adminSaveFormFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = CategoryActions.adminSaveFormFailure({ error });
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
