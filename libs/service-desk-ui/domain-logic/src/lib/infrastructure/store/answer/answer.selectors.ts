import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ANSWER_FEATURE_KEY, State, answerAdapter, AnswerPartialState } from './answer.reducer';
import { getServiceDeskUiState } from './../index';

export const getServiceState = createSelector(
  getServiceDeskUiState,
  (state: AnswerPartialState) => state[ANSWER_FEATURE_KEY]
);
export const getAnswerState = createFeatureSelector<State>(ANSWER_FEATURE_KEY);

const { selectAll, selectEntities } = answerAdapter.getSelectors();

export const getLoading = createSelector(getAnswerState, (state: State) => state.loading);

export const getLoaded = createSelector(getAnswerState, (state: State) => state.loaded);

export const getError = createSelector(getAnswerState, (state: State) => state.error);

export const getAll = createSelector(getAnswerState, (state: State) => selectAll(state));

export const getEntities = createSelector(getAnswerState, (state: State) => selectEntities(state));
