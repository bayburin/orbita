import { Employee } from '../../../entities/models/employee/employee.interface';
import { State, employeeAdapter, employeeInitialState } from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

describe('EmployeeSelectors', () => {
  const error = 'No Error Available';
  const createEmployeeEntity = (id: number, name = '') =>
    (({
      id,
      lastName: name || `name-${id}`,
    } as unknown) as Employee);
  const arrEntities = [createEmployeeEntity(1), createEmployeeEntity(2), createEmployeeEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 1;
  let state: State;

  beforeEach(() => {
    state = {
      employee: employeeAdapter.setAll(arrEntities, {
        ...employeeInitialState,
        selectedId,
        error,
        loading: false,
        loaded: true,
      }),
    };
  });

  it('getEmployeeState() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeState.projector(state)).toEqual(state.employee);
  });

  it('getEmployeeLoading() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeLoading.projector(state.employee)).toBe(false);
  });

  it('getEmployeeLoaded() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeLoaded.projector(state.employee)).toBe(true);
  });

  it('getEmployeeError() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeError.projector(state.employee)).toBe(error);
  });

  it('getEmployeeAll() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeAll.projector(state.employee)).toEqual(arrEntities);
  });

  it('getEmployeeEntities() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeEntities.projector(state.employee)).toEqual(entities);
  });

  it('getEmployeeSelectedId() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeSelectedId.projector(state.employee)).toEqual(selectedId);
  });

  it('getEmployeeSelected() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeSelected.projector(entities, 1)).toEqual(entities[1]);
  });
});
