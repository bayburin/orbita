import { Action } from '@ngrx/store';

import * as UserRecommendationActions from './user-recommendation.actions';
import { UserRecommendation } from '../../../entities/model/user-recommendation.interface';
import { State, initialState, reducer } from './user-recommendation.reducer';

describe('UserRecommendationReducer', () => {
  let action: Action;
  const createUserRecommendation = (id: number, name = ''): UserRecommendation =>
    ({
      id,
      link: name || `name-${id}`,
    } as UserRecommendation);

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const recommendations = [createUserRecommendation(111), createUserRecommendation(222)];
      initialState.loading = true;
      action = UserRecommendationActions.loadAllSuccess({ recommendations });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = UserRecommendationActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
