import { SdRequest } from '../../entities/sd-request.interface';
import { sdRequestAdapter, initialState } from './sd-request.reducer';
import * as SdRequestSelectors from './sd-request.selectors';

describe('SdRequestSelectors', () => {
  const error = { message: 'error' };
  const createSdRequestEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as unknown as SdRequest);
  const arrEntities = [
    createSdRequestEntity('PRODUCT-AAA'),
    createSdRequestEntity('PRODUCT-BBB'),
    createSdRequestEntity('PRODUCT-CCC'),
  ];
  const entities = {
    'PRODUCT-AAA': arrEntities[0],
    'PRODUCT-BBB': arrEntities[1],
    'PRODUCT-CCC': arrEntities[2]
  };
  const selectedId = 'PRODUCT-BBB';
  let state: any;

  beforeEach(() => {
    state = sdRequestAdapter.setAll(
      arrEntities,
      {
        ...initialState,
        selectedId: selectedId,
        error: error,
        loaded: true
      }
    )
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SdRequestSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(SdRequestSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(SdRequestSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SdRequestSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return "selectedId" attribute', () => {
    expect(SdRequestSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return selected entity', () => {
    expect(SdRequestSelectors.getSelected.projector(entities, selectedId)).toEqual(arrEntities[1]);
  });
});