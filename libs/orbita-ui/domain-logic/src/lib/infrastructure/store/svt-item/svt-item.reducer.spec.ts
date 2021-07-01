import { Action } from '@ngrx/store';

import { State, initialState, reducer } from './svt-item.reducer';
import * as SvtItemActions from './svt-item.actions';
import { SvtItem } from './../../../entities/models/svt/svt-item.interface';

describe('SvtItemReducer', () => {
  let action: Action;
  const createSvtItemEntity = (id: number, name = '') =>
    (({
      barcode_item: { id },
      item_model: name || `name-${id}`,
    } as unknown) as SvtItem);

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

  describe('loadSelectedFailure', () => {
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

  describe('clearSelected', () => {
    it('should set attributes', () => {
      action = SvtItemActions.clearSelected();
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
