import { EmployeeShort } from '../../../entities/models/employee/employee-short.interface';
import { employeeAdapter, initialState } from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

describe('EmployeeSelectors', () => {
  const error = { message: 'error message' };
  const createEmployeeEntity = (id: number, name = '') =>
    ({
      id,
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
      error,
    });
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

  it('getAll() should return array of entities', () => {
    expect(EmployeeSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(EmployeeSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
