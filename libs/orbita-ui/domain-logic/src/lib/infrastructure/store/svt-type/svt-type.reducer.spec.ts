import { Action } from '@ngrx/store';

import { SvtType } from './../../../entities/models/svt/svt-type.interface';
import * as SvtTypeActions from './svt-type.actions';
import { State, initialState, reducer } from './svt-type.reducer';

describe('SvtTypeReducer', () => {
  let action: Action;
  const createSvtTypeEntity = (id: number, name = '') =>
    ({
      type_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtType);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const svtTypes = [createSvtTypeEntity(1), createSvtTypeEntity(2)];
      action = SvtTypeActions.setAll({ svtTypes });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const svtTypes = [createSvtTypeEntity(1), createSvtTypeEntity(2)];
      action = SvtTypeActions.setAll({ svtTypes });
      let result: State = reducer(initialState, action);
      action = SvtTypeActions.clearAll();
      result = reducer(result, action);

      expect(result.ids.length).toBe(0);
      expect(result.loaded).toBe(false);
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
