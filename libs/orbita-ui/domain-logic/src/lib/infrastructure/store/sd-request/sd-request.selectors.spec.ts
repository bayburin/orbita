import { SdRequest } from '../../../entities/models/sd-request.interface';
import { sdRequestAdapter, initialState } from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';

describe('SdRequestSelectors', () => {
  const error = { message: 'error' };
  const createSdRequestEntity = (id: string, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as SdRequest);
  const arrEntities = [
    createSdRequestEntity('PRODUCT-AAA'),
    createSdRequestEntity('PRODUCT-BBB'),
    createSdRequestEntity('PRODUCT-CCC'),
  ];
  const entities = {
    'PRODUCT-AAA': arrEntities[0],
    'PRODUCT-BBB': arrEntities[1],
    'PRODUCT-CCC': arrEntities[2],
  };
  const selectedId = 'PRODUCT-BBB';
  const totalCount = 3;
  const perPage = 4;
  const firstRowIndex = 0;
  let state: any;

  beforeEach(() => {
    state = sdRequestAdapter.setAll(arrEntities, {
      ...initialState,
      selectedId,
      firstRowIndex,
      totalCount,
      perPage,
      error,
      loading: false,
      loaded: true,
    });
  });

  it('getFirstRowIndex() should return "page" attribute', () => {
    expect(SdRequestSelectors.getFirstRowIndex.projector(state)).toEqual(firstRowIndex);
  });

  it('getTotalCount() should return "totalCount" attribute', () => {
    expect(SdRequestSelectors.getTotalCount.projector(state)).toEqual(totalCount);
  });

  it('getPerPage() should return "perPage" attribute', () => {
    expect(SdRequestSelectors.getPerPage.projector(state)).toEqual(perPage);
  });

  it('getSelectedId() should return "selectedId" attribute', () => {
    expect(SdRequestSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SdRequestSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SdRequestSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(SdRequestSelectors.getError.projector(state)).toEqual(error);
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

  it('getSelected() should return selected entity', () => {
    expect(SdRequestSelectors.getSelected.projector(entities, selectedId)).toEqual(arrEntities[1]);
  });

  it('getPage', () => {
    expect(SdRequestSelectors.getPage.projector(firstRowIndex, perPage)).toEqual(1);
  });
});
