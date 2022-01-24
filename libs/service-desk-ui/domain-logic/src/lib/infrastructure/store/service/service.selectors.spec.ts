import { Service } from '../../../entities/models/service.interface';
import { serviceAdapter, ServicePartialState, initialState } from './service.reducer';
import * as ServiceSelectors from './service.selectors';

describe('ServiceSelectors', () => {
  const error = { message: 'error message' };
  const formError = { message: 'form error message' };
  const createServiceEntity = (id: number, name = ''): Service =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Service);
  const arrEntities = [createServiceEntity(1), createServiceEntity(2), createServiceEntity(3)];
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
    state = serviceAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      selectedId,
      error,
      form,
      loadingIds: [1, 2, 3],
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(ServiceSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(ServiceSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(ServiceSelectors.getError.projector(state)).toEqual(error);
  });

  it('getIds() should return "ids" attribute', () => {
    expect(ServiceSelectors.getIds.projector(state)).toEqual([1, 2, 3]);
  });

  it('getLoadingIds() should return "loadingIds" attribute', () => {
    expect(ServiceSelectors.getLoadingIds.projector(state)).toEqual([1, 2, 3]);
  });

  it('getAll() should return array of entities', () => {
    expect(ServiceSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(ServiceSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(ServiceSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return svtItem state', () => {
    expect(ServiceSelectors.getSelected.projector(entities, selectedId)).toEqual(entities[selectedId]);
  });

  // ========== Форма рекомендаций для пользователя ==========

  it('getForm() should return "form" attribute', () => {
    expect(ServiceSelectors.getForm.projector(state)).toEqual(form);
  });

  it('getFormData() should return "formData" attribute', () => {
    expect(ServiceSelectors.getFormData.projector(form)).toEqual(formData);
  });

  it('getFormLoading() should return "loading" attribute', () => {
    expect(ServiceSelectors.getFormLoading.projector(form)).toBe(false);
  });

  it('getFormDisplayForm() should return "displayForm" attribute', () => {
    expect(ServiceSelectors.getFormDisplayForm.projector(form)).toBe(true);
  });

  it('getFormError() should return "error" attribute', () => {
    expect(ServiceSelectors.getFormError.projector(form)).toEqual(formError);
  });
});
