import { applicationAdapter, initialState } from './application.reducer';
import * as ApplicationSelectors from './application.selectors';
import { Application } from './../../../entities/models/application.interface';

describe('ApplicationSelectors', () => {
  const createApplicationEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Application);
  const arrEntities = [createApplicationEntity(1), createApplicationEntity(2), createApplicationEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = applicationAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(ApplicationSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(ApplicationSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(ApplicationSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
