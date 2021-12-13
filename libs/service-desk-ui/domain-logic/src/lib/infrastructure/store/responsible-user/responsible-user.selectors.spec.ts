import { ResponsibleUserEntity } from './responsible-user.models';
import { responsibleUserAdapter, ResponsibleUserPartialState, initialState } from './responsible-user.reducer';
import * as ResponsibleUserSelectors from './responsible-user.selectors';

describe('ResponsibleUser Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getResponsibleUserId = (it: ResponsibleUserEntity) => it.id;
  const createResponsibleUserEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ResponsibleUserEntity);

  let state: ResponsibleUserPartialState;

  beforeEach(() => {
    state = {
      responsibleUser: responsibleUserAdapter.setAll(
        [
          createResponsibleUserEntity('PRODUCT-AAA'),
          createResponsibleUserEntity('PRODUCT-BBB'),
          createResponsibleUserEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('ResponsibleUser Selectors', () => {
    it('getAllResponsibleUser() should return the list of ResponsibleUser', () => {
      const results = ResponsibleUserSelectors.getAllResponsibleUser(state);
      const selId = getResponsibleUserId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ResponsibleUserSelectors.getSelected(state) as ResponsibleUserEntity;
      const selId = getResponsibleUserId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getResponsibleUserLoaded() should return the current "loaded" status', () => {
      const result = ResponsibleUserSelectors.getResponsibleUserLoaded(state);

      expect(result).toBe(true);
    });

    it('getResponsibleUserError() should return the current "error" state', () => {
      const result = ResponsibleUserSelectors.getResponsibleUserError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
