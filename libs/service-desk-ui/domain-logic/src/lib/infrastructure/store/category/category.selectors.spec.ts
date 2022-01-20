import { Category } from '../../../entities/models/category.interface';
import { categoryAdapter, initialState } from './category.reducer';
import * as CategorySelectors from './category.selectors';

describe('CategorySelectors', () => {
  const error = { message: 'error message' };
  const formError = { message: 'form error message' };
  const createCategoryEntity = (id: number, name = ''): Category =>
    ({
      id,
      name: name || `name-${id}`,
    } as Category);
  const arrEntities = [createCategoryEntity(1), createCategoryEntity(2), createCategoryEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  const formData = {
    name: 'fake name',
  };
  const form = {
    formData,
    loading: false,
    displayForm: true,
    error: formError,
  };
  let state: any;

  beforeEach(() => {
    state = categoryAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      selectedId,
      error,
      form,
      loadingIds: [1, 2, 3],
    });
  });

  it('getIds() should return "ids" attribute', () => {
    expect(CategorySelectors.getIds.projector(state)).toEqual([1, 2, 3]);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(CategorySelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(CategorySelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(CategorySelectors.getError.projector(state)).toEqual(error);
  });

  it('getLoadingIds() should return "loadingIds" attribute', () => {
    expect(CategorySelectors.getLoadingIds.projector(state)).toEqual([1, 2, 3]);
  });

  it('getAll() should return array of entities', () => {
    expect(CategorySelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(CategorySelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(CategorySelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return svtItem state', () => {
    expect(CategorySelectors.getSelected.projector(entities, selectedId)).toEqual(entities[selectedId]);
  });

  // ========== Форма рекомендаций для пользователя ==========

  it('getForm() should return "form" attribute', () => {
    expect(CategorySelectors.getForm.projector(state)).toEqual(form);
  });

  it('getFormData() should return "formData" attribute', () => {
    expect(CategorySelectors.getFormData.projector(form)).toEqual(formData);
  });

  it('getFormLoading() should return "loading" attribute', () => {
    expect(CategorySelectors.getFormLoading.projector(form)).toBe(false);
  });

  it('getFormDisplayForm() should return "displayForm" attribute', () => {
    expect(CategorySelectors.getFormDisplayForm.projector(form)).toBe(true);
  });

  it('getFormError() should return "error" attribute', () => {
    expect(CategorySelectors.getFormError.projector(form)).toEqual(formError);
  });
});
