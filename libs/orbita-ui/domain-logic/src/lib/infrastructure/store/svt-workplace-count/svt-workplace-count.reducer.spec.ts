import { Action } from '@ngrx/store';

import { SvtWorkplaceCount } from './../../../entities/models/svt/svt-workplace-count.interface';
import * as SvtWorkplaceCountActions from './svt-workplace-count.actions';
import { State, initialState, reducer } from './svt-workplace-count.reducer';

describe('SvtWorkplaceCountReducer', () => {
  let action: Action;
  const createSvtWorkplaceCountEntity = (id: number, name = '') =>
    ({
      workplace_count_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtWorkplaceCount);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const wpCounts = [createSvtWorkplaceCountEntity(1), createSvtWorkplaceCountEntity(2)];
      action = SvtWorkplaceCountActions.setAll({ wpCounts });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const wpCounts = [createSvtWorkplaceCountEntity(1), createSvtWorkplaceCountEntity(2)];
      action = SvtWorkplaceCountActions.setAll({ wpCounts });
      let result: State = reducer(initialState, action);
      action = SvtWorkplaceCountActions.clearAll();
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
