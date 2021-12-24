import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as QuestionActions from './question.actions';
import { Question } from '../../../entities/models/question.interface';

export const QUESTION_FEATURE_KEY = 'question';

export interface State extends EntityState<Question> {}

export interface QuestionPartialState {
  readonly [QUESTION_FEATURE_KEY]: State;
}

export const questionAdapter: EntityAdapter<Question> = createEntityAdapter<Question>();

export const initialState: State = questionAdapter.getInitialState({});

const questionReducer = createReducer(
  initialState,
  on(QuestionActions.setEntities, (state, { entities }) => ({
    ...state,
    entities: entities,
    ids: Object.keys(entities).map(Number),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return questionReducer(state, action);
}
