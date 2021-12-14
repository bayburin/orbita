import { Tag } from './../../../entities/model/tag.interface';
import { tagAdapter, TagPartialState, initialState } from './tag.reducer';
import * as TagSelectors from './tag.selectors';

describe('Tag Selectors', () => {
  const error = { message: 'error message' };
  const createTagEntity = (id: number, name = ''): Tag =>
    ({
      id,
      name: name || `name-${id}`,
    } as Tag);
  const arrEntities = [createTagEntity(1), createTagEntity(2), createTagEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = tagAdapter.setAll(arrEntities, {
      ...initialState,
      error,
    });
  });

  it('getAll() should return array of entities', () => {
    expect(TagSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(TagSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
