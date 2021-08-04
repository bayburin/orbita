import { NewSdRequestViewForm } from './../../../entities/forms/new-sd-request-view-form.interface';
import { SdRequest } from '../../../entities/models/sd-request.interface';
import { sdRequestAdapter, initialState } from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';
import { SdRequestFactory } from './../../factories/sd-request.factory';

describe('SdRequestSelectors', () => {
  const createSdRequestEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as SdRequest);
  const arrEntities = [createSdRequestEntity(111), createSdRequestEntity(222), createSdRequestEntity(333)];
  const entities = {
    111: arrEntities[0],
    222: arrEntities[1],
    333: arrEntities[2],
  };
  const totalCount = 3;
  const perPage = 4;
  const firstRowIndex = 0;
  const sortField = 'name';
  const sortOrder = 1;
  const filters = { foo: 'bar' };
  const selectedEntity = createSdRequestEntity(444);
  const formEntity = SdRequestFactory.createViewForm();
  const newFormEntity = { description: 'test' } as NewSdRequestViewForm;
  let selectedState: any;
  let formState: any;
  let newFormState: any;
  let state: any;

  beforeEach(() => {
    selectedState = {
      entity: selectedEntity,
      skeleton: false,
      editMode: true,
      error: 'fake-selected-error',
    };
    formState = {
      entity: formEntity,
      loading: false,
      updateView: true,
    };
    newFormState = {
      entity: newFormEntity,
      loading: false,
    };
    state = sdRequestAdapter.setAll(arrEntities, {
      ...initialState,
      firstRowIndex,
      totalCount,
      perPage,
      sortField,
      sortOrder,
      filters,
      loading: false,
      loaded: true,
      needTickets: true,
      error: 'fake-error',
      selected: selectedState,
      form: formState,
      newForm: newFormState,
    });
  });

  // ========== Список заявок ==========

  it('getFirstRowIndex() should return "page" attribute', () => {
    expect(SdRequestSelectors.getFirstRowIndex.projector(state)).toBe(firstRowIndex);
  });

  it('getTotalCount() should return "totalCount" attribute', () => {
    expect(SdRequestSelectors.getTotalCount.projector(state)).toBe(totalCount);
  });

  it('getSortField() should return "sortField" attribute', () => {
    expect(SdRequestSelectors.getSortField.projector(state)).toBe(sortField);
  });

  it('getSortOrder() should return "sortOrder" attribute', () => {
    expect(SdRequestSelectors.getSortOrder.projector(state)).toBe(sortOrder);
  });

  it('getPerPage() should return "perPage" attribute', () => {
    expect(SdRequestSelectors.getPerPage.projector(state)).toBe(perPage);
  });

  it('getFilters() should return "filters" attribute', () => {
    expect(SdRequestSelectors.getFilters.projector(state)).toEqual(filters);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SdRequestSelectors.getLoading.projector(state)).toBe(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SdRequestSelectors.getLoaded.projector(state)).toBe(true);
  });

  it('getNeedTickets() should return "needTickets" attribute', () => {
    expect(SdRequestSelectors.getNeedTickets.projector(state)).toBe(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(SdRequestSelectors.getError.projector(state)).toBe('fake-error');
  });

  it('getAll() should return array of entities', () => {
    expect(SdRequestSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getAllSorted() should return sorted array of entities', () => {
    expect(SdRequestSelectors.getAllSorted.projector(arrEntities, 'id', -1)).toEqual(arrEntities.reverse());
  });

  it('getEntities() should return entities', () => {
    expect(SdRequestSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getPage', () => {
    expect(SdRequestSelectors.getPage.projector(firstRowIndex, perPage)).toBe(1);
  });

  // ========== Просмотр выбранной заявки ==========

  it('getSelected() should return selected entity', () => {
    expect(SdRequestSelectors.getSelected.projector(state)).toEqual(selectedState);
  });

  it('getSelectedEntity() should return selected entity', () => {
    expect(SdRequestSelectors.getSelectedEntity.projector(selectedState)).toEqual(selectedEntity);
  });

  it('getSelectedSkeleton() should return selected entity', () => {
    expect(SdRequestSelectors.getSelectedSkeleton.projector(selectedState)).toBe(false);
  });

  it('getSelectedEditMode() should return selected entity', () => {
    expect(SdRequestSelectors.getSelectedEditMode.projector(selectedState)).toBe(true);
  });

  it('getSelectedError() should return selected entity', () => {
    expect(SdRequestSelectors.getSelectedError.projector(selectedState)).toBe('fake-selected-error');
  });

  // ========== Форма существующей заявки ==========

  it('getForm() should return form state', () => {
    expect(SdRequestSelectors.getForm.projector(state)).toEqual(formState);
  });

  it('getFormEntity() should return form entity', () => {
    expect(SdRequestSelectors.getFormEntity.projector(formState)).toEqual(formEntity);
  });

  it('getFormLoading() should return loading attribute', () => {
    expect(SdRequestSelectors.getFormLoading.projector(formState)).toBe(false);
  });

  it('getFormUpdateView() should return updateView attribute', () => {
    expect(SdRequestSelectors.getFormUpdateView.projector(formState)).toBe(true);
  });

  // ========== Форма новой заявки ==========

  it('getNewForm() should return newForm state', () => {
    expect(SdRequestSelectors.getNewForm.projector(state)).toEqual(newFormState);
  });

  it('getNewFormEntity() should return form entity', () => {
    expect(SdRequestSelectors.getNewFormEntity.projector(newFormState)).toEqual(newFormEntity);
  });

  it('getNewFormLoading() should return loading attribute', () => {
    expect(SdRequestSelectors.getNewFormLoading.projector(newFormState)).toBe(false);
  });
});
