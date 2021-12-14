import { createSelector } from '@ngrx/store';

import { ANSWER_FEATURE_KEY, State, answerAdapter, AnswerPartialState } from './answer.reducer';
import { getServiceDeskUiState } from './../index';

export const getAnswerState = createSelector(
  getServiceDeskUiState,
  (state: AnswerPartialState) => state[ANSWER_FEATURE_KEY]
);
const { selectAll, selectEntities } = answerAdapter.getSelectors();

export const getAll = createSelector(getAnswerState, (state: State) => selectAll(state));

export const getEntities = createSelector(getAnswerState, (state: State) => selectEntities(state));
