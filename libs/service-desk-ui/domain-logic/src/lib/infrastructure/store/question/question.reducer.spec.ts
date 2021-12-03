import { Action } from '@ngrx/store';

import * as QuestionActions from './question.actions';
import { Question } from '../../../entities/model/question.interface';
import { State, initialState, reducer } from './question.reducer';

describe('QuestionReducer', () => {
  let action: Action;
  const createQuestion = (id: number, name = ''): Question =>
    ({
      id,
      ticket: { name: name || `name-${id}` },
    } as Question);

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createQuestion(111), 222: createQuestion(222) };
      action = QuestionActions.setEntities({ entities });
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
