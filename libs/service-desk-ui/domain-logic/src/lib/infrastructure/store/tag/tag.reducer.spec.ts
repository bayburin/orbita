import { Action } from '@ngrx/store';

import { Tag } from './../../../entities/model/tag.interface';
import * as TagActions from './tag.actions';
import { State, initialState, reducer } from './tag.reducer';

describe('TagReducer', () => {
  let action: Action;
  const createTag = (id: number, name = ''): Tag => ({
    id,
    name: name || `name-${id}`,
  });

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createTag(111), 222: createTag(222) };
      action = TagActions.setEntities({ entities });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
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
