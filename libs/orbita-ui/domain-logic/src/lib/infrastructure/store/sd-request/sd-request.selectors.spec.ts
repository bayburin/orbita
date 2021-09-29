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
  const selectedEntity = createSdRequestEntity(444);
  const arrEntities = [
    createSdRequestEntity(111),
    createSdRequestEntity(222),
    createSdRequestEntity(333),
    selectedEntity,
  ];
  const entities = {
    111: arrEntities[0],
    222: arrEntities[1],
    333: arrEntities[2],
    444: selectedEntity,
  };
  const totalCount = 3;
  const formEntity = SdRequestFactory.createViewForm();
  const newFormEntity = { description: 'test' } as NewSdRequestViewForm;
  const created = createSdRequestEntity(555);
  let selectedState: any;
  let formState: any;
  let newFormState: any;
  let state: any;

  beforeEach(() => {
    selectedState = {
      id: 444,
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
      created,
      showModalAfterCreate: true,
    };
    state = sdRequestAdapter.setAll(arrEntities, {
      ...initialState,
      totalCount,
      loading: false,
      loaded: true,
      error: 'fake-error',
      selected: selectedState,
      form: formState,
      newForm: newFormState,
    });
  });

  // ========== Список заявок ==========

  it('getTotalCount() should return "totalCount" attribute', () => {
    expect(SdRequestSelectors.getTotalCount.projector(state)).toBe(totalCount);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SdRequestSelectors.getLoading.projector(state)).toBe(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SdRequestSelectors.getLoaded.projector(state)).toBe(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(SdRequestSelectors.getError.projector(state)).toBe('fake-error');
  });

  it('getAll() should return array of entities', () => {
    expect(SdRequestSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SdRequestSelectors.getEntities.projector(state)).toEqual(entities);
  });

  // ========== Просмотр выбранной заявки ==========

  it('getSelected() should return selected entity', () => {
    expect(SdRequestSelectors.getSelected.projector(state)).toEqual(selectedState);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(SdRequestSelectors.getSelectedId.projector(selectedState)).toEqual(444);
  });

  it('getSelectedEntity() should return selected entity', () => {
    expect(SdRequestSelectors.getSelectedEntity.projector(entities, 444)).toEqual(selectedEntity);
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

  it('getNewFormCreated() should return created attribute', () => {
    expect(SdRequestSelectors.getNewFormCreated.projector(newFormState)).toEqual(created);
  });

  it('getNewFormShowModalAfterCreate() should return created attribute', () => {
    expect(SdRequestSelectors.getNewFormShowModalAfterCreate.projector(newFormState)).toBe(true);
  });
});
