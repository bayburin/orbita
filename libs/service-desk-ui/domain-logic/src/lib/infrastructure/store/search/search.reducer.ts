import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Category } from './../../../entities/model/category.interface';
import { Service } from './../../../entities/model/service.interface';
import { Question } from './../../../entities/model/question.interface';
import * as SearchActions from './search.actions';

export const SEARCH_FEATURE_KEY = 'search';

export interface SearchCategoryState extends EntityState<Category> {}
export interface SearchServiceState extends EntityState<Service> {}
export interface SearchQuestionState extends EntityState<Question> {}

export interface State {
  category: SearchCategoryState;
  service: SearchServiceState;
  question: SearchQuestionState;
  categoryIds: number[];
  serviceIds: number[];
  questionIds: number[];
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface SearchPartialState {
  readonly [SEARCH_FEATURE_KEY]: State;
}

export const searchCategoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();
export const searchServiceAdapter: EntityAdapter<Service> = createEntityAdapter<Service>();
export const searchQuestionAdapter: EntityAdapter<Question> = createEntityAdapter<Question>();

export const initialState: State = {
  category: searchCategoryAdapter.getInitialState(),
  service: searchServiceAdapter.getInitialState(),
  question: searchQuestionAdapter.getInitialState(),
  categoryIds: [],
  serviceIds: [],
  questionIds: [],
  loading: false,
  loaded: false,
};

const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    categoryIds: [],
    serviceIds: [],
    questionIds: [],
  })),
  on(SearchActions.searchSuccess, (state, { categoryIds, serviceIds, questionIds }) => ({
    ...state,
    loading: false,
    loaded: true,
    categoryIds,
    serviceIds,
    questionIds,
  })),
  on(SearchActions.searchFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(SearchActions.setAll, (state, { result }) => ({
    ...state,
    category: searchCategoryAdapter.setAll(result.categories, { ...state.category }),
    service: searchServiceAdapter.setAll(result.services, { ...state.service }),
    question: searchQuestionAdapter.setAll(result.questions, { ...state.question }),
  })),
  on(SearchActions.removeAll, (state) => ({
    ...state,
    loaded: false,
    category: searchCategoryAdapter.removeAll({ ...state.category }),
    service: searchServiceAdapter.removeAll({ ...state.service }),
    question: searchQuestionAdapter.removeAll({ ...state.question }),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action);
}
