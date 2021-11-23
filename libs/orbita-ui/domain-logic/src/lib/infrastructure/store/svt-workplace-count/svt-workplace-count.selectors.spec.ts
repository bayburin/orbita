import { svtWorkplaceCountAdapter, initialState } from './svt-workplace-count.reducer';
import * as SvtWorkplaceCountSelectors from './svt-workplace-count.selectors';
import { SvtWorkplaceCount } from './../../../entities/models/svt/svt-workplace-count.interface';

describe('SvtWorkplaceCountSelectors', () => {
  const createSvtWorkplaceCountEntity = (id: number, name = '') =>
    ({
      workplace_count_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtWorkplaceCount);
  const arrEntities = [
    createSvtWorkplaceCountEntity(1),
    createSvtWorkplaceCountEntity(2),
    createSvtWorkplaceCountEntity(3),
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = svtWorkplaceCountAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SvtWorkplaceCountSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(SvtWorkplaceCountSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SvtWorkplaceCountSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
