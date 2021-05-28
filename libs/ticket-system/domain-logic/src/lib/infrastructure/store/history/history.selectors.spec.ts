import { historyAdapter, initialState } from './history.reducer';
import * as HistorySelectors from './history.selectors';
import { History } from './../../../entities/models/history.interface';

describe('HistorySelectors', () => {
  const createHistoryEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as History);
  const arrEntities = [
    createHistoryEntity(1),
    createHistoryEntity(2),
    createHistoryEntity(3)
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2]
  };
  let state: any;

  beforeEach(() => {
    state = historyAdapter.setAll(
      arrEntities,
      {
        ...initialState,
        loaded: true
      }
    );
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(HistorySelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(HistorySelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(HistorySelectors.getEntities.projector(state)).toEqual(entities);
  });
});
