import { svtWorkplaceAdapter, initialState } from './svt-workplace.reducer';
import * as SvtWorkplaceSelectors from './svt-workplace.selectors';
import { SvtWorkplace } from './../../../entities/models/svt/svt-workplace.interface';

describe('SvtWorkplaceSelectors', () => {
  const createSvtWorkplaceEntity = (id: number, name = '') =>
    ({
      workplace_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtWorkplace);
  const arrEntities = [createSvtWorkplaceEntity(1), createSvtWorkplaceEntity(2), createSvtWorkplaceEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = svtWorkplaceAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SvtWorkplaceSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(SvtWorkplaceSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SvtWorkplaceSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
