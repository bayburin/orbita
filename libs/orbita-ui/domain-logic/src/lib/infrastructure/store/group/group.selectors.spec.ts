import { groupAdapter, initialState } from './group.reducer';
import * as GroupSelectors from './group.selectors';
import { Group } from './../../../entities/models/group.interface';

describe('GroupSelectors', () => {
  const createGroupEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Group);
  const arrEntities = [
    createGroupEntity(1),
    createGroupEntity(2),
    createGroupEntity(3),
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = groupAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(GroupSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(GroupSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(GroupSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
