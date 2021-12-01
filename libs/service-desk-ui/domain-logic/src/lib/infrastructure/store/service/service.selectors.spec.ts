import { Service } from '../../../entities/model/service.interface';
import { serviceAdapter, ServicePartialState, initialState } from './service.reducer';
import * as ServiceSelectors from './service.selectors';

describe('ServiceSelectors', () => {
  const error = { message: 'error message' };
  const createServiceEntity = (id: number, name = ''): Service =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Service);
  const arrEntities = [createServiceEntity(1), createServiceEntity(2), createServiceEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  let state: any;

  beforeEach(() => {
    state = serviceAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      selectedId,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(ServiceSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(ServiceSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(ServiceSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(ServiceSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(ServiceSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(ServiceSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return svtItem state', () => {
    expect(ServiceSelectors.getSelected.projector(entities, selectedId)).toEqual(entities[selectedId]);
  });
});
