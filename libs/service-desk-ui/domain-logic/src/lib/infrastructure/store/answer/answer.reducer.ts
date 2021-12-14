import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Answer } from '../../../entities/model/answer.interface';
import * as AnswerActions from './answer.actions';

export const ANSWER_FEATURE_KEY = 'answer';

export interface State extends EntityState<Answer> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface AnswerPartialState {
  readonly [ANSWER_FEATURE_KEY]: State;
}

export const answerAdapter: EntityAdapter<Answer> = createEntityAdapter<Answer>();

export const initialState: State = answerAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const answerReducer = createReducer(
  initialState,
  on(AnswerActions.setEntities, (state, { entities }) => ({
    ...state,
    entities: entities,
    ids: Object.keys(entities).map(Number),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return answerReducer(state, action);
}
