import { SearchResultTypes } from './../../../entities/model/search-result.types';
import {
  initialState,
  searchCategoryAdapter,
  searchServiceAdapter,
  searchQuestionAdapter,
  searchResponsibleUserAdapter,
} from './search.reducer';
import * as SearchSelectors from './search.selectors';
import { Category } from './../../../entities/model/category.interface';
import { Service } from './../../../entities/model/service.interface';
import { Question } from './../../../entities/model/question.interface';
import { ResponsibleUser } from '../../../entities/model/responsible-user.interface';

describe('Search Selectors', () => {
  const error = { message: 'error message' };
  const createCategory = (id: number, name = ''): Category =>
    ({
      id,
      name: name || `name-${id}`,
    } as Category);
  const createService = (id: number, name = ''): Service =>
    ({
      id,
      name: name || `name-${id}`,
    } as Service);
  const createQuestion = (id: number, service_id = 0, name = ''): Question =>
    ({
      id,
      ticket: { name: name || `name-${id}`, service_id },
    } as Question);
  const createResponsibleUser = (id: number, tn = 0): ResponsibleUser =>
    ({
      id,
      tn,
    } as ResponsibleUser);
  const arrCategories = [createCategory(1), createCategory(2), createCategory(3)];
  const arrServices = [createService(4), createService(5), createService(6)];
  const arrQuestions = [createQuestion(7, 5), createQuestion(8), createQuestion(9)];
  const arrResponsibleUsers = [
    createResponsibleUser(10, 1000),
    createResponsibleUser(11, 1001),
    createResponsibleUser(12, 1002),
  ];
  const categoryEntities = {
    1: arrCategories[0],
    2: arrCategories[1],
    3: arrCategories[2],
  };
  const serviceEntities = {
    4: arrServices[0],
    5: arrServices[1],
    6: arrServices[2],
  };
  const questionEntities = {
    7: arrQuestions[0],
    8: arrQuestions[1],
    9: arrQuestions[2],
  };
  const responsibleUserEntities = {
    10: arrResponsibleUsers[0],
    11: arrResponsibleUsers[1],
    12: arrResponsibleUsers[2],
  };
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      category: searchCategoryAdapter.setAll(arrCategories, { ...initialState.category }),
      service: searchServiceAdapter.setAll(arrServices, { ...initialState.service }),
      question: searchQuestionAdapter.setAll(arrQuestions, { ...initialState.question }),
      responsibleUser: searchResponsibleUserAdapter.setAll(arrResponsibleUsers, { ...initialState.responsibleUser }),
      categoryIds: [1, 2],
      serviceIds: [3, 4],
      questionIds: [5, 6],
      loaded: true,
      loading: true,
      error,
    };
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SearchSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SearchSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(SearchSelectors.getError.projector(state)).toEqual(error);
  });

  it('getCategoryIds() should return "categoryIds" attribute', () => {
    expect(SearchSelectors.getCategoryIds.projector(state)).toEqual([1, 2]);
  });

  it('getServiceIds() should return "serviceIds" attribute', () => {
    expect(SearchSelectors.getServiceIds.projector(state)).toEqual([3, 4]);
  });

  it('getQuestionIds() should return "questionIds" attribute', () => {
    expect(SearchSelectors.getQuestionIds.projector(state)).toEqual([5, 6]);
  });

  // ========== Подтип хранилища Category ==========

  it('getAllCategories() should return array of categories', () => {
    expect(SearchSelectors.getAllCategories.projector(state)).toEqual(arrCategories);
  });

  it('getCategoryEntities() should return category entities', () => {
    expect(SearchSelectors.getCategoryEntities.projector(state)).toEqual(categoryEntities);
  });

  it('getSearchCategories() should return array of categories', () => {
    expect(SearchSelectors.getSearchCategories.projector([1, 2], categoryEntities)).toEqual([
      categoryEntities[1],
      categoryEntities[2],
    ]);
  });

  // ========== Подтип хранилища Service ==========

  it('getAllServices() should return array of services', () => {
    expect(SearchSelectors.getAllServices.projector(state)).toEqual(arrServices);
  });

  it('getServiceEntities() should return service entities', () => {
    expect(SearchSelectors.getServiceEntities.projector(state)).toEqual(serviceEntities);
  });

  it('getSearchServices() should return array of services', () => {
    expect(SearchSelectors.getSearchServices.projector([4, 5], serviceEntities)).toEqual([
      serviceEntities[4],
      serviceEntities[5],
    ]);
  });

  // ========== Подтип хранилища Question ==========

  it('getAllQuestions() should return array of questions', () => {
    expect(SearchSelectors.getAllQuestions.projector(state)).toEqual(arrQuestions);
  });

  it('getQuestionEntities() should return question entities', () => {
    expect(SearchSelectors.getQuestionEntities.projector(state)).toEqual(questionEntities);
  });

  it('getSearchServices() should return array of questions', () => {
    expect(SearchSelectors.getSearchServices.projector([7, 8], questionEntities)).toEqual([
      questionEntities[7],
      questionEntities[8],
    ]);
  });

  // ========== Подтип хранилища ResponsibleUser ==========

  it('getAllResponsibleUsers() should return array of responsibleUsers', () => {
    expect(SearchSelectors.getAllResponsibleUsers.projector(state)).toEqual(arrResponsibleUsers);
  });

  it('getResponsibleUserEntities() should return responsibleUser entities', () => {
    expect(SearchSelectors.getResponsibleUserEntities.projector(state)).toEqual(responsibleUserEntities);
  });

  it('getSearchResponsibleUsers() should return array of responsibleUsers', () => {
    expect(SearchSelectors.getSearchResponsibleUsers.projector([10, 11], responsibleUserEntities)).toEqual([
      responsibleUserEntities[10],
      responsibleUserEntities[11],
    ]);
  });

  // ========== View Model Selectors ==========

  // it('getSearchResult() should return question entities', () => {
  //   const categories = [arrCategories[0]];
  //   const services = [arrServices[0]];
  //   const questions = [arrQuestions[0]];

  //   const questionResult: SearchResultTypes = {
  //     ...arrQuestions[0],
  //     answers: [],
  //     correction: null,
  //     ticket: {
  //       ...arrQuestions[0].ticket,
  //       service: arrServices[1],
  //       responsible_users: [],
  //     },
  //   };

  //   expect(SearchSelectors.getSearchResult.projector(categories, services, questions, serviceEntities).length).toEqual(
  //     3
  //   );
  //   expect(SearchSelectors.getSearchResult.projector(categories, services, questions, serviceEntities)).toEqual([
  //     ...categories,
  //     ...services,
  //     questionResult,
  //   ]);
  // });
});
