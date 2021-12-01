import { Category } from '../../../entities/model/category.interface';
import { categoryAdapter, CategoryPartialState, initialState } from './category.reducer';
import * as CategorySelectors from './category.selectors';

describe('Category Selectors', () => {
  const error = { message: 'error message' };
  const createCategoryEntity = (id: number, name = ''): Category =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Category);
  const arrEntities = [createCategoryEntity(1), createCategoryEntity(2), createCategoryEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  let state: any;

  beforeEach(() => {
    state = categoryAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      selectedId,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(CategorySelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(CategorySelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(CategorySelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(CategorySelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(CategorySelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(CategorySelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return svtItem state', () => {
    expect(CategorySelectors.getSelected.projector(entities, selectedId)).toEqual(entities[selectedId]);
  });
});
