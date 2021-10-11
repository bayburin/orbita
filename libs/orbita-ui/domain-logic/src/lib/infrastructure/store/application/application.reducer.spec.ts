import { Action } from '@ngrx/store';

import { Application } from './../../../entities/models/application.interface';
import * as ApplicationActions from './application.actions';
import { State, initialState, reducer } from './application.reducer';

describe('ApplicationReducer', () => {
  let action: Action;
  const createApplicationEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Application);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const applications = [createApplicationEntity(1), createApplicationEntity(2)];
      action = ApplicationActions.setAll({ applications });
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
