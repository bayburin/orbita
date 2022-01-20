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

  // ========== Форма рекомендаций для пользователя ==========

  describe('initForm', () => {
    it('should change attributes', () => {
      const category = createCategory(1, 'test');
      action = CategoryActions.adminInitForm({ category });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(category);
      expect(result.form.displayForm).toBe(true);
    });
  });

  describe('closeForm', () => {
    it('should change attributes', () => {
      action = CategoryActions.adminCloseForm();
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBeNull();
      expect(result.form.displayForm).toBe(false);
      expect(result.form.formData).toBeNull();
    });
  });

  describe('changeForm', () => {
    it('should change attributes', () => {
      const formData = createCategory(1, 'test');
      action = CategoryActions.adminChangeForm({ formData });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(formData);
    });
  });

  describe('saveForm', () => {
    it('should change attributes', () => {
      action = CategoryActions.adminSaveForm();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(true);
      expect(result.form.error).toBe(null);
    });
  });

  describe('saveFormSuccess', () => {
    it('should change attributes', () => {
      const category = createCategory(1, 'test');
      initialState.form.formData = category;
      action = CategoryActions.adminSaveFormSuccess({ category });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.form.loading).toBe(false);
    });
  });

  describe('saveFormFailure', () => {
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
