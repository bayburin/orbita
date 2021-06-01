import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  USER_FEATURE_KEY,
  State,
  UserPartialState,
  userAdapter,
} from './user.reducer';

export const getUserState = createSelector(
  getOrbitaUiState,
  (state: UserPartialState) => state[USER_FEATURE_KEY]
);

const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getLoaded = createSelector(
  getUserState,
  (state: State) => state.loaded
);

export const getAll = createSelector(getUserState, (state: State) =>
  selectAll(state)
);

export const getEntities = createSelector(getUserState, (state: State) =>
  selectEntities(state)
);
