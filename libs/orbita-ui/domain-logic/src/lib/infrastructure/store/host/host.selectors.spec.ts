import { hostAdapter, initialState } from './host.reducer';
import * as HostSelectors from './host.selectors';
import { Host } from './../../../entities/models/host.interface';

describe('HostSelectors', () => {
  const error = { message: 'error' };
  const createHostEntity = (id: string, mac = '') =>
    (({
      id,
      mac: mac || `mac-${id}`,
    } as unknown) as Host);
  const arrEntities = [createHostEntity('111'), createHostEntity('222'), createHostEntity('333')];
  const entities = {
    '111': arrEntities[0],
    '222': arrEntities[1],
    '333': arrEntities[2],
  };
  const selectedId = '111';
  let state: any;

  beforeEach(() => {
    state = hostAdapter.setAll(arrEntities, {
      ...initialState,
      selectedId,
      error,
      loading: false,
      loaded: true,
    });
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(HostSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(HostSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(HostSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(HostSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(HostSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(HostSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return host state', () => {
    expect(HostSelectors.getSelected.projector(entities, '111')).toEqual(entities[111]);
  });
});
