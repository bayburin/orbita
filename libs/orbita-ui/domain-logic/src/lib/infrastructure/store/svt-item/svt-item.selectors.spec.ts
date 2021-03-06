import { svtItemAdapter, initialState } from './svt-item.reducer';
import * as SvtItemSelectors from './svt-item.selectors';
import { SvtItem } from './../../../entities/models/svt/svt-item.interface';

describe('SvtItem Selectors', () => {
  const error = { message: 'error' };
  const createSvtItemEntity = (id: number, name = '') =>
    ({
      barcode_item: { id },
      item_model: name || `name-${id}`,
    } as unknown as SvtItem);
  const arrEntities = [createSvtItemEntity(111), createSvtItemEntity(222), createSvtItemEntity(333)];
  const entities = {
    111: arrEntities[0],
    222: arrEntities[1],
    333: arrEntities[2],
  };
  const selectedId = 111;
  let state: any;

  beforeEach(() => {
    state = svtItemAdapter.setAll(arrEntities, {
      ...initialState,
      selectedId,
      error,
      loading: false,
      loaded: true,
    });
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SvtItemSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SvtItemSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(SvtItemSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(SvtItemSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(SvtItemSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(SvtItemSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return svtItem state', () => {
    expect(SvtItemSelectors.getSelected.projector(entities, 111)).toEqual(entities[111]);
  });
});
