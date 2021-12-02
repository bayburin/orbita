import { Action } from '@ngrx/store';

import * as CategoryActions from './category.actions';
import { Category } from '../../../entities/model/category.interface';
import { State, initialState, reducer } from './category.reducer';

describe('CategoryReducer', () => {
  let action: Action;
  const createCategory = (id: number, name = ''): Category =>
    ({
      id,
      name: name || `name-${id}`,
    } as Category);

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

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
