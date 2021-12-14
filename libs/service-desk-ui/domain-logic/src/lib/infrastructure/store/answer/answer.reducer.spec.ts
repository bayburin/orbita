import { Action } from '@ngrx/store';

import * as AnswerActions from './answer.actions';
import { State, initialState, reducer } from './answer.reducer';
import { Answer } from '../../../entities/model/answer.interface';

describe('AnswerReducer', () => {
  let action: Action;
  const createAnswer = (id: number, answer = ''): Answer =>
    ({
      id,
      answer: answer || `answer-${id}`,
    } as Answer);

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createAnswer(111), 222: createAnswer(222) };
      action = AnswerActions.setEntities({ entities });
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
