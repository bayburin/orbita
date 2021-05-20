import { User } from '../../../entities/models/user.interface';
import { userAdapter, initialState } from './user.reducer';
import * as UserSelectors from './user.selectors';

describe('UserSelectors', () => {
  const error = { message: 'error' };
  const createUserEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as User);
  const arrEntities = [
    createUserEntity('PRODUCT-AAA'),
    createUserEntity('PRODUCT-BBB'),
    createUserEntity('PRODUCT-CCC'),
  ];
  const entities = {
    'PRODUCT-AAA': arrEntities[0],
    'PRODUCT-BBB': arrEntities[1],
    'PRODUCT-CCC': arrEntities[2]
  };
  let state: any;

  beforeEach(() => {
    state = userAdapter.setAll(
      arrEntities,
      {
        ...initialState,
        error,
        loaded: true
      }
      )
  });

  describe('User Selectors', () => {
    it('getLoaded() should return "loaded" attribute', () => {
      expect(UserSelectors.getLoaded.projector(state)).toEqual(true);
    });

    it('getError() should return "error" attribute', () => {
      expect(UserSelectors.getError.projector(state)).toEqual(error);
    });

    it('getAll() should return array of entities', () => {
      expect(UserSelectors.getAll.projector(state)).toEqual(arrEntities);
    });

    it('getEntities() should return entities', () => {
      expect(UserSelectors.getEntities.projector(state)).toEqual(entities);
    });
  });
});
