import { workAdapter, initialState } from './work.reducer';
import * as WorkSelectors from './work.selectors';
import { Work } from './../../../entities/models/work.interface';

describe('WorkSelectors', () => {
  const createWorkEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Work);
  const arrEntities = [
    createWorkEntity(1),
    createWorkEntity(2),
    createWorkEntity(3),
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = workAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(WorkSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(WorkSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(WorkSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
