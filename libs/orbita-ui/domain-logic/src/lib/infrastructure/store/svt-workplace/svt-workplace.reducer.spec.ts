import { Action } from '@ngrx/store';

import { SvtWorkplace } from './../../../entities/models/svt/svt-workplace.interface';
import * as SvtWorkplaceActions from './svt-workplace.actions';
import { State, initialState, reducer } from './svt-workplace.reducer';

describe('SvtWorkplaceReducer', () => {
  let action: Action;
  const createSvtWorkplaceEntity = (id: number, name = '') =>
    ({
      workplace_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtWorkplace);

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const workplaces = [createSvtWorkplaceEntity(1), createSvtWorkplaceEntity(2)];
      action = SvtWorkplaceActions.setAll({ workplaces });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('clearAll()', () => {
    it('should change "entities" attributes', () => {
      const workplaces = [createSvtWorkplaceEntity(1), createSvtWorkplaceEntity(2)];
      action = SvtWorkplaceActions.setAll({ workplaces });
      let result: State = reducer(initialState, action);
      action = SvtWorkplaceActions.clearAll();
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
