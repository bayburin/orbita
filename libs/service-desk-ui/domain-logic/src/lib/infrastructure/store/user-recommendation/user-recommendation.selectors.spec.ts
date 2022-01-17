import { userRecommendationAdapter, UserRecommendationPartialState, initialState } from './user-recommendation.reducer';
import { UserRecommendation } from '../../../entities/models/user-recommendation.interface';
import * as UserRecommendationSelectors from './user-recommendation.selectors';

describe('UserRecommendationSelectors', () => {
  const error = { message: 'error message' };
  const formError = { message: 'form error message' };
  const createCategoryEntity = (id: number, name = ''): UserRecommendation =>
    ({
      id,
      title: name || `name-${id}`,
    } as UserRecommendation);
  const arrEntities = [createCategoryEntity(1), createCategoryEntity(2), createCategoryEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  const formData = {
    title: 'fake title',
  };
  const form = {
    formData,
    loading: false,
    displayForm: true,
    error: formError,
  };
  let state: any;

  beforeEach(() => {
    state = userRecommendationAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: false,
      loading: true,
      error,
      form,
      selectedId,
      selectedLoaded: true,
      selectedLoading: false,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(UserRecommendationSelectors.getLoaded.projector(state)).toBe(false);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(UserRecommendationSelectors.getLoading.projector(state)).toBe(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(UserRecommendationSelectors.getError.projector(state)).toEqual(error);
  });

  it('getSelectedId() should return "selectedId" attribute', () => {
    expect(UserRecommendationSelectors.getSelectedId.projector(state)).toBe(selectedId);
  });

  it('getSelectedLoading() should return "getSelectedLoading" attribute', () => {
    expect(UserRecommendationSelectors.getSelectedLoading.projector(state)).toBe(false);
  });

  it('getAll() should return array of entities', () => {
    expect(UserRecommendationSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(UserRecommendationSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelected() should return svtItem state', () => {
    expect(UserRecommendationSelectors.getSelected.projector(entities, selectedId)).toEqual(entities[selectedId]);
  });

  // ========== Форма рекомендаций для пользователя ==========

  it('getForm() should return "form" attribute', () => {
    expect(UserRecommendationSelectors.getForm.projector(state)).toEqual(form);
  });

  it('getFormData() should return "formData" attribute', () => {
    expect(UserRecommendationSelectors.getFormData.projector(form)).toEqual(formData);
  });

  it('getFormLoading() should return "loading" attribute', () => {
    expect(UserRecommendationSelectors.getFormLoading.projector(form)).toBe(false);
  });

  it('getFormDisplayForm() should return "displayForm" attribute', () => {
    expect(UserRecommendationSelectors.getFormDisplayForm.projector(form)).toBe(true);
  });

  it('getFormError() should return "error" attribute', () => {
    expect(UserRecommendationSelectors.getFormError.projector(form)).toEqual(formError);
  });
});
