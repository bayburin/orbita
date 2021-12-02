import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UserRecommendationActions from './user-recommendation.actions';
import { UserRecommendation } from '../../../entities/model/user-recommendation.interface';

export const USER_RECOMMENDATION_FEATURE_KEY = 'userRecommendation';

export interface State extends EntityState<UserRecommendation> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface UserRecommendationPartialState {
  readonly [USER_RECOMMENDATION_FEATURE_KEY]: State;
}

export const userRecommendationAdapter: EntityAdapter<UserRecommendation> = createEntityAdapter<UserRecommendation>();

export const initialState: State = userRecommendationAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const userRecommendationReducer = createReducer(
  initialState,
  on(UserRecommendationActions.setAll, (state, { recommendations }) =>
    userRecommendationAdapter.setAll(recommendations, state)
  ),
  on(UserRecommendationActions.loadAll, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(UserRecommendationActions.loadAllSuccess, (state, { recommendations }) =>
    userRecommendationAdapter.setAll(recommendations, { ...state, loaded: true, loading: false })
  ),
  on(UserRecommendationActions.loadAllFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return userRecommendationReducer(state, action);
}
