import { sdServiceAdapter, initialState } from './sd-service.reducer';
import * as SdServiceSelectors from './sd-service.selectors';
import { SdService } from './../../../entities/models/sd/sd-service.interface';

describe('SdServiceSelectors', () => {
  const createSdServiceEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as SdService);
  const arrEntities = [createSdServiceEntity(1), createSdServiceEntity(2), createSdServiceEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = sdServiceAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getAll() should return array of entities', () => {
    expect(SdServiceSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SdServiceSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
