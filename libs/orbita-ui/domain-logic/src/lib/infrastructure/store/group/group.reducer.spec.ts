import { Action } from '@ngrx/store';

import { Group } from './../../../entities/models/group.interface';
import * as GroupActions from './group.actions';
import { State, initialState, reducer } from './group.reducer';

describe('GroupReducer', () => {
  let action: Action;
  const createGroupEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Group);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const groups = [createGroupEntity(1), createGroupEntity(2)];
      action = GroupActions.setAll({ groups });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
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
