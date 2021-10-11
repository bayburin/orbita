import { messageAdapter, initialState } from './message.reducer';
import * as MessageSelectors from './message.selectors';
import { Message } from './../../../entities/models/message.interface';

describe('MessageSelectors', () => {
  const error = { message: 'error message' };
  const createMessageEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Message);
  const arrEntities = [
    createMessageEntity(1),
    createMessageEntity(2),
    createMessageEntity(3),
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = messageAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(MessageSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(MessageSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(MessageSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(MessageSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
