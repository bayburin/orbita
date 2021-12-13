import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Category } from './../../../entities/model/category.interface';
import { Service } from './../../../entities/model/service.interface';
import { Question } from './../../../entities/model/question.interface';
import { ResponsibleUser } from '../../../entities/model/responsible-user.interface';
import * as SearchActions from './search.actions';

export const SEARCH_FEATURE_KEY = 'search';

export interface SearchCategoryState extends EntityState<Category> {}
export interface SearchServiceState extends EntityState<Service> {}
export interface SearchQuestionState extends EntityState<Question> {}
export interface SearchResponsibleUserState extends EntityState<ResponsibleUser> {}

export interface State {
  category: SearchCategoryState;
  service: SearchServiceState;
  question: SearchQuestionState;
  responsibleUser: SearchResponsibleUserState;
  categoryIds: number[];
  serviceIds: number[];
  questionIds: number[];
  responsibleUserIds: number[];
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
export const searchResponsibleUserAdapter: EntityAdapter<ResponsibleUser> = createEntityAdapter<ResponsibleUser>();

export const initialState: State = {
  category: searchCategoryAdapter.getInitialState(),
  service: searchServiceAdapter.getInitialState(),
  question: searchQuestionAdapter.getInitialState(),
  responsibleUser: searchResponsibleUserAdapter.getInitialState(),
  categoryIds: [],
  serviceIds: [],
  questionIds: [],
  responsibleUserIds: [],
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
    responsibleUserIds: [],
  })),
  on(SearchActions.searchSuccess, (state, { categoryIds, serviceIds, questionIds, responsibleUserIds }) => ({
    ...state,
    loading: false,
    loaded: true,
    categoryIds,
    serviceIds,
    questionIds,
    responsibleUserIds,
  })),
  on(SearchActions.searchFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(SearchActions.setAll, (state, { categories, services, questions, responsibleUsers }) => ({
    ...state,
    category: searchCategoryAdapter.setAll(categories, { ...state.category }),
    service: searchServiceAdapter.setAll(services, { ...state.service }),
    question: searchQuestionAdapter.setAll(questions, { ...state.question }),
    responsibleUser: searchResponsibleUserAdapter.setAll(responsibleUsers, { ...state.responsibleUser }),
  })),
  on(SearchActions.removeAll, (state) => ({
    ...state,
    loaded: false,
    category: searchCategoryAdapter.removeAll({ ...state.category }),
    service: searchServiceAdapter.removeAll({ ...state.service }),
    question: searchQuestionAdapter.removeAll({ ...state.question }),
    responsibleUser: searchResponsibleUserAdapter.removeAll({ ...state.responsibleUser }),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action);
}
