import { Action } from '@ngrx/store';

import { Parameter } from '../../../entities/models/parameter.interface';
import * as ParameterActions from './parameter.actions';
import { State, initialState, reducer } from './parameter.reducer';

describe('ParameterReducer', () => {
  let action: Action;
  const createParameterEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Parameter);

  describe('loadAll()', () => {
    it('should change "loaded" and "error" attributes', () => {
      action = ParameterActions.loadAll({ claim_id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });
  });

  describe('loadAllSuccess()', () => {
    it('should change "loaded" and "loading" attributes', () => {
      const parameters = [
        createParameterEntity(1),
        createParameterEntity(2)
      ];
      action = ParameterActions.loadAllSuccess({ parameters });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('loadAllFailure()', () => {
    it('should change "loading" and "error" attributes', () => {
      const error = { message: 'test message' };
      action = ParameterActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
