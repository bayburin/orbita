import { EmployeeShort } from '../../../entities/models/employee/employee-short.interface';
import { employeeAdapter, initialState } from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

describe('EmployeeSelectors', () => {
  const error = { message: 'error message' };
  const createEmployeeEntity = (id: number, name = '') =>
    ({
      personnelNo: id,
      lastName: name || `name-${id}`,
    } as unknown as EmployeeShort);
  const arrEntities = [createEmployeeEntity(1), createEmployeeEntity(2), createEmployeeEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = employeeAdapter.setAll(arrEntities, {
      ...initialState,
      loading: true,
      loaded: false,
      searchIds: [2],
      error,
    });
  });

  it('getIds() should return "ids" attribute', () => {
    expect(EmployeeSelectors.getIds.projector(state)).toEqual([1, 2, 3]);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(EmployeeSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getLoaded() should return "loading" attribute', () => {
    expect(EmployeeSelectors.getLoaded.projector(state)).toEqual(false);
  });

  it('getError() should return "error" attribute', () => {
    expect(EmployeeSelectors.getError.projector(state)).toEqual(error);
  });

  it('getSearchIds() should return "searchIds" attribute', () => {
    expect(EmployeeSelectors.getSearchIds.projector(state)).toEqual([2]);
  });

  it('getAll() should return array of entities', () => {
    expect(EmployeeSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(EmployeeSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSearched() should return searched entities', () => {
    expect(EmployeeSelectors.getSearched.projector([2], entities)).toEqual([entities[2]]);
  });
});
