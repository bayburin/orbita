import { Category } from '../../../entities/models/category.interface';
import { Question } from '../../../entities/models/question.interface';
import { Service } from '../../../entities/models/service.interface';
import { initialState } from './deep-search.reducer';
import * as DeepSearchSelectors from './deep-search.selectors';

describe('DeepSearch Selectors', () => {
  const error = { message: 'error message' };
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      categoryIds: [1, 2],
      serviceIds: [3, 4],
      questionIds: [5, 6],
      loaded: false,
      loading: true,
      error,
    };
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(DeepSearchSelectors.getLoaded.projector(state)).toEqual(false);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(DeepSearchSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(DeepSearchSelectors.getError.projector(state)).toEqual(error);
  });

  it('getCategoryIds() should return "categoryIds" attribute', () => {
    expect(DeepSearchSelectors.getCategoryIds.projector(state)).toEqual([1, 2]);
  });

  it('getServiceIds() should return "serviceIds" attribute', () => {
    expect(DeepSearchSelectors.getServiceIds.projector(state)).toEqual([3, 4]);
  });

  it('getQuestionIds() should return "questionIds" attribute', () => {
    expect(DeepSearchSelectors.getQuestionIds.projector(state)).toEqual([5, 6]);
  });

  it('getCategories() should return selected "categories"', () => {
    const createCategory = (id: number, name = ''): Category =>
      ({
        id,
        name: name || `name-${id}`,
      } as Category);
    const entities = { 1: createCategory(1), 2: createCategory(2) };

    expect(DeepSearchSelectors.getCategories.projector(state.categoryIds, entities)).toEqual(Object.values(entities));
  });

  it('getServices() should return selected "services"', () => {
    const createService = (id: number, name = ''): Service =>
      ({
        id,
        name: name || `name-${id}`,
      } as Service);
    const entities = { 3: createService(3), 4: createService(4) };

    expect(DeepSearchSelectors.getServices.projector(state.serviceIds, entities)).toEqual(Object.values(entities));
  });

  it('getQuestions() should return selected "questions"', () => {
    const createQuestion = (id: number, name = ''): Question =>
      ({
        id,
        ticket: { name: name || `name-${id}` },
      } as Question);
    const entities = { 5: createQuestion(5), 6: createQuestion(6) };

    expect(DeepSearchSelectors.getQuestions.projector(state.questionIds, entities)).toEqual(Object.values(entities));
  });
});
