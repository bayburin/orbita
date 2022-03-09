import { Action } from '@ngrx/store';

import { SvtWorkplaceType } from './../../../entities/models/svt/svt-workplace-type.interface';
import * as SvtWorkplaceTypeActions from './svt-workplace-type.actions';
import { State, initialState, reducer } from './svt-workplace-type.reducer';

describe('SvtWorkplaceTypeReducer', () => {
  let action: Action;
  const createSvtWorkplaceTypeEntity = (id: number, name = '') =>
    ({
      workplace_type_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtWorkplaceType);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const wpTypes = [createSvtWorkplaceTypeEntity(1), createSvtWorkplaceTypeEntity(2)];
      action = SvtWorkplaceTypeActions.setAll({ wpTypes });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const wpTypes = [createSvtWorkplaceTypeEntity(1), createSvtWorkplaceTypeEntity(2)];
      action = SvtWorkplaceTypeActions.setAll({ wpTypes });
      let result: State = reducer(initialState, action);
      action = SvtWorkplaceTypeActions.clearAll();
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
