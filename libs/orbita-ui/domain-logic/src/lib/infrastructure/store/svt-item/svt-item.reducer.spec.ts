import { Action } from '@ngrx/store';

import { State, initialState, reducer } from './svt-item.reducer';
import * as SvtItemActions from './svt-item.actions';
import { SvtItem } from './../../../entities/models/svt/svt-item.interface';

describe('SvtItemReducer', () => {
  let action: Action;
  const createSvtItemEntity = (id: number, name = '') =>
    ({
      barcode_item: { id },
      item_model: name || `name-${id}`,
    } as unknown as SvtItem);

  describe('loadAll', () => {
    it('should set attributes', () => {
      action = SvtItemActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
      expect(result.needItems).toBe(false);
    });
  });

  describe('loadAllSuccess', () => {
    it('should set attributes', () => {
      const svtItems = [createSvtItemEntity(1), createSvtItemEntity(2)];
      action = SvtItemActions.loadAllSuccess({ svtItems });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllFailure', () => {
    it('should set attributes', () => {
      const error = 'fake-error';
      action = SvtItemActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(0);
      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('loadSelected', () => {
    it('should set attributes', () => {
      action = SvtItemActions.loadSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should set attributes', () => {
      const svtItem = createSvtItemEntity(123);
      action = SvtItemActions.loadSelectedSuccess({ svtItem });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids[0]).toBe(svtItem.barcode_item.id);
    });
  });

  describe('loadSelectedNotFound', () => {
    it('should set attributes', () => {
      action = SvtItemActions.loadSelectedNotFound();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(0);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should set attributes', () => {
      const error = 'error message';
      action = SvtItemActions.loadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('select', () => {
    it('should set attributes', () => {
      action = SvtItemActions.select({ barcode: 123 });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe(123);
    });
  });

  describe('clearSelected', () => {
    it('should set attributes', () => {
      action = SvtItemActions.clearSelected();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.selectedId).toBeNull();
    });
  });

  describe('loadAllForForm', () => {
    it('should set attributes', () => {
      action = SvtItemActions.loadAllForForm();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
      expect(result.needFormItems).toBe(false);
    });
  });

  describe('loadAllForFormSuccess', () => {
    it('should set attributes', () => {
      const svtItems = [createSvtItemEntity(1), createSvtItemEntity(2)];
      action = SvtItemActions.loadAllForFormSuccess({ svtItems });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllForFormFailure', () => {
    it('should set attributes', () => {
      const error = 'fake-error';
      action = SvtItemActions.loadAllForFormFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(0);
      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('setFormFilters', () => {
    it('should set attributes', () => {
      const filters = { tn: 12345 };
      action = SvtItemActions.setFormFilters({ filters });
      const result: State = reducer(initialState, action);

      expect(result.formFilters).toBe(filters);
    });
  });

  describe('clearAll', () => {
    it('should set attributes', () => {
      const svtItems = [createSvtItemEntity(1), createSvtItemEntity(2)];
      action = SvtItemActions.loadAllSuccess({ svtItems });
      let result: State = reducer(initialState, action);
      action = SvtItemActions.clearAll();
      result = reducer(result, action);

      expect(result.ids.length).toBe(0);
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
