import { svtTypeAdapter, initialState } from './svt-type.reducer';
import * as SvtTypeSelectors from './svt-type.selectors';
import { SvtType } from './../../../entities/models/svt/svt-type.interface';

describe('SvtTypeSelectors', () => {
  const createSvtTypeEntity = (id: number, name = '') =>
    ({
      type_id: id,
      name: name || `name-${id}`,
    } as unknown as SvtType);
  const arrEntities = [createSvtTypeEntity(1), createSvtTypeEntity(2), createSvtTypeEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = svtTypeAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SvtTypeSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(SvtTypeSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SvtTypeSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
