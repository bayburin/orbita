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
  const totalCount = 3;
  const perPage = 4;
  const firstRowIndex = 0;
  const sortField = 'name';
  const sortOrder = 1;
  const filters = { foo: 'bar' };
  const selected = createSdRequestEntity('PRODUCT-DDD');
  let state: any;

  beforeEach(() => {
    state = sdRequestAdapter.setAll(arrEntities, {
      ...initialState,
      firstRowIndex,
      totalCount,
      sortField,
      sortOrder,
      filters,
      selected,
      perPage,
      error,
      loading: false,
      loaded: true,
      needTickets: true,
    });
  });

  it('getFirstRowIndex() should return "page" attribute', () => {
    expect(SdRequestSelectors.getFirstRowIndex.projector(state)).toEqual(firstRowIndex);
  });

  it('getTotalCount() should return "totalCount" attribute', () => {
    expect(SdRequestSelectors.getTotalCount.projector(state)).toEqual(totalCount);
  });

  it('getSortField() should return "sortField" attribute', () => {
    expect(SdRequestSelectors.getSortField.projector(state)).toEqual(sortField);
  });

  it('getSortOrder() should return "sortOrder" attribute', () => {
    expect(SdRequestSelectors.getSortOrder.projector(state)).toEqual(sortOrder);
  });

  it('getPerPage() should return "perPage" attribute', () => {
    expect(SdRequestSelectors.getPerPage.projector(state)).toEqual(perPage);
  });

  it('getFilters() should return "filters" attribute', () => {
    expect(SdRequestSelectors.getFilters.projector(state)).toEqual(filters);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SdRequestSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SdRequestSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getNeedTickets() should return "needTickets" attribute', () => {
    expect(SdRequestSelectors.getNeedTickets.projector(state)).toEqual(true);
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
    expect(SdRequestSelectors.getSelected.projector(state)).toEqual(selected);
  });

  it('getPage', () => {
    expect(SdRequestSelectors.getPage.projector(firstRowIndex, perPage)).toEqual(1);
  });
});
