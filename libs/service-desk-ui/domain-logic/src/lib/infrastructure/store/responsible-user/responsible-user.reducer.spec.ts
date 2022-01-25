import { Action } from '@ngrx/store';

import { ResponsibleUser } from '../../../entities/models/responsible-user.interface';
import * as ResponsibleUserActions from './responsible-user.actions';
import { State, initialState, reducer } from './responsible-user.reducer';

describe('ResponsibleUserReducer', () => {
  let action: Action;
  const createResponsibleUser = (id: number, tn = 0): ResponsibleUser =>
    ({
      id,
      tn,
    } as ResponsibleUser);

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createResponsibleUser(111), 222: createResponsibleUser(222) };
      action = ResponsibleUserActions.setEntities({ entities });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('setMany', () => {
    it('should change attributes', () => {
      const responsibleUsers = [createResponsibleUser(111), createResponsibleUser(222)];
      action = ResponsibleUserActions.setMany({ responsibleUsers });
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
