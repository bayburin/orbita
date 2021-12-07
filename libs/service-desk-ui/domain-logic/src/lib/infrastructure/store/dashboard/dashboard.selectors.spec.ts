import { initialState } from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';
import { Category } from './../../../entities/model/category.interface';
import { Service } from './../../../entities/model/service.interface';

describe('DashboardSelectors', () => {
  const error = { message: 'error message' };
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      loaded: true,
      loading: true,
      categoryIds: [1, 2],
      serviceIds: [3, 4],
      error,
    };
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(DashboardSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(DashboardSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getCategoryIds() should return "categoryIds" attribute', () => {
    expect(DashboardSelectors.getCategoryIds.projector(state)).toEqual([1, 2]);
  });

  it('getServiceIds() should return "serviceIds" attribute', () => {
    expect(DashboardSelectors.getServiceIds.projector(state)).toEqual([3, 4]);
  });

  it('getError() should return "error" attribute', () => {
    expect(DashboardSelectors.getError.projector(state)).toEqual(error);
  });

  it('getCategories() should return selected "categories"', () => {
    const createCategory = (id: number, name = ''): Category =>
      ({
        id,
        name: name || `name-${id}`,
      } as Category);
    const entities = { 1: createCategory(1), 2: createCategory(2) };

    expect(DashboardSelectors.getCategories.projector(state.categoryIds, entities)).toEqual(Object.values(entities));
  });

  it('getServices() should return selected "services"', () => {
    const createService = (id: number, name = ''): Service =>
      ({
        id,
        name: name || `name-${id}`,
      } as Service);
    const entities = { 3: createService(3), 4: createService(4) };

    expect(DashboardSelectors.getServices.projector(state.serviceIds, entities)).toEqual(Object.values(entities));
  });
});
