import { userAdapter, initialState } from './user.reducer';
import * as UserSelectors from './user.selectors';
import { User } from './../../../entities/models/user.interface';

describe('UserSelectors', () => {
  const createUserEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as User);
  const arrEntities = [
    createUserEntity(1),
    createUserEntity(2),
    createUserEntity(3)
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2]
  };
  let state: any;

  beforeEach(() => {
    state = userAdapter.setAll(
      arrEntities,
      {
        ...initialState,
        loaded: true
      }
    );
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(UserSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(UserSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(UserSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
