import { createSelector } from '@ngrx/store';

import { QUESTION_FEATURE_KEY, State, questionAdapter, QuestionPartialState } from './question.reducer';
import { getServiceDeskUiState } from '../index';

export const getQuestionState = createSelector(
  getServiceDeskUiState,
  (state: QuestionPartialState) => state[QUESTION_FEATURE_KEY]
);

const { selectAll, selectEntities } = questionAdapter.getSelectors();

export const getAll = createSelector(getQuestionState, (state: State) => selectAll(state));

export const getEntities = createSelector(getQuestionState, (state: State) => selectEntities(state));
