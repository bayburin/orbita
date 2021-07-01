import { parameterAdapter, initialState } from './parameter.reducer';
import * as ParameterSelectors from './parameter.selectors';
import { Parameter } from './../../../entities/models/parameter.interface';

describe('ParameterSelectors', () => {
  const error = { message: 'error message' };
  const createParameterEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Parameter);
  const arrEntities = [createParameterEntity(1), createParameterEntity(2), createParameterEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = parameterAdapter.setAll(arrEntities, {
      ...initialState,
      loading: false,
      loaded: true,
      error,
    });
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(ParameterSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(ParameterSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(ParameterSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(ParameterSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(ParameterSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
