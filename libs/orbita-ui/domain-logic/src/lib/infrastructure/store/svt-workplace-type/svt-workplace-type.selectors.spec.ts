import { svtWorkplaceTypeAdapter, initialState } from './svt-workplace-type.reducer';
import * as SvtWorkplaceTypeSelectors from './svt-workplace-type.selectors';
import { SvtWorkplaceType } from './../../../entities/models/svt/svt-workplace-type.interface';

describe('SvtWorkplaceTypeSelectors', () => {
  const createSvtWorkplaceTypeEntity = (id: number, name = '') =>
    ({
      workplace_type_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtWorkplaceType);
  const arrEntities = [
    createSvtWorkplaceTypeEntity(1),
    createSvtWorkplaceTypeEntity(2),
    createSvtWorkplaceTypeEntity(3),
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = svtWorkplaceTypeAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SvtWorkplaceTypeSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(SvtWorkplaceTypeSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SvtWorkplaceTypeSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
