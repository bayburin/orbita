import { UserRecommendation } from '../../../entities/model/user-recommendation.interface';

import { userRecommendationAdapter, UserRecommendationPartialState, initialState } from './user-recommendation.reducer';
import * as UserRecommendationSelectors from './user-recommendation.selectors';

describe('UserRecommendationSelectors', () => {
  const error = { message: 'error message' };
  const createCategoryEntity = (id: number, name = ''): UserRecommendation =>
    ({
      id,
      title: name || `name-${id}`,
    } as UserRecommendation);
  const arrEntities = [createCategoryEntity(1), createCategoryEntity(2), createCategoryEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = userRecommendationAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(UserRecommendationSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(UserRecommendationSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(UserRecommendationSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(UserRecommendationSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(UserRecommendationSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
