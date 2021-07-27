import { Employee } from '../../../entities/models/employee/employee.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import {
  State,
  employeeAdapter,
  employeeInitialState,
  employeeShortAdapter,
  employeeShortInitialState,
} from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

describe('EmployeeSelectors', () => {
  const error = 'No Error Available';
  const shortError = 'No Short Error Avaliable';
  const createEmployeeEntity = (id: number, name = '') =>
    ({
      id,
      lastName: name || `name-${id}`,
    } as unknown as Employee);
  const createEmployeeShortEntity = (id: number, name = '') =>
    ({
      id,
      lastName: name || `name-${id}`,
    } as unknown as EmployeeShort);
  const arrEntities = [createEmployeeEntity(1), createEmployeeEntity(2), createEmployeeEntity(3)];
  const arrShortEntities = [createEmployeeShortEntity(4), createEmployeeShortEntity(5), createEmployeeShortEntity(6)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const shortEntities = {
    4: arrShortEntities[0],
    5: arrShortEntities[1],
    6: arrShortEntities[2],
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
      employeeShort: employeeShortAdapter.setAll(arrShortEntities, {
        ...employeeShortInitialState,
        error: shortError,
        loading: false,
        loaded: true,
      }),
    };
  });

  // ========== Подтип хранилища Employee ==========

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

  // ========== Подтип хранилища EmployeeShort ==========

  it('getEmployeeState() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeShortState.projector(state)).toEqual(state.employeeShort);
  });

  it('getEmployeeShortLoading() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeShortLoading.projector(state.employeeShort)).toBe(false);
  });

  it('getEmployeeShortLoaded() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeShortLoaded.projector(state.employeeShort)).toBe(true);
  });

  it('getEmployeeShortError() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeShortError.projector(state.employeeShort)).toBe(shortError);
  });

  it('getEmployeeShortAll() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeShortAll.projector(state.employeeShort)).toEqual(arrShortEntities);
  });

  it('getEmployeeShortEntities() should return employee state', () => {
    expect(EmployeeSelectors.getEmployeeShortEntities.projector(state.employeeShort)).toEqual(shortEntities);
  });
});
