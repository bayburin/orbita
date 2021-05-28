import { FreeSdRequestType } from '../../../entities/models/sd/free-sd-request-type.interface';
import { freeSdRequestTypeAdapter, initialState } from './free-sd-request-type.reducer';
import * as FreeSdRequestTypeSelectors from './free-sd-request-type.selectors';

describe('FreeSdRequestTypeSelectors', () => {
  const error = { message: 'error' };
  const createFreeSdRequestTypeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as unknown as FreeSdRequestType);
  const arrEntities = [
    createFreeSdRequestTypeEntity('PRODUCT-AAA'),
    createFreeSdRequestTypeEntity('PRODUCT-BBB'),
    createFreeSdRequestTypeEntity('PRODUCT-CCC'),
  ];
  const entities = {
    'PRODUCT-AAA': arrEntities[0],
    'PRODUCT-BBB': arrEntities[1],
    'PRODUCT-CCC': arrEntities[2]
  };
  const selectedId = 'PRODUCT-BBB';
  let state: any;

  beforeEach(() => {
    state = freeSdRequestTypeAdapter.setAll(
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
    expect(FreeSdRequestTypeSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(FreeSdRequestTypeSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(FreeSdRequestTypeSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(FreeSdRequestTypeSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return "selectedId" attribute', () => {
    expect(FreeSdRequestTypeSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return selected entity', () => {
    expect(FreeSdRequestTypeSelectors.getSelected.projector(entities, selectedId)).toEqual(arrEntities[1]);
  });
});
