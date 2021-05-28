import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UserActions from './user.actions';
import { User } from '../../../entities/models/user.interface';

export const USER_FEATURE_KEY = 'user';

export interface State extends EntityState<User> {
  loaded: boolean;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = userAdapter.getInitialState({
  loaded: false
});

const userReducer = createReducer(
  initialState,
  on(UserActions.setAll, (state, { users }) =>
    userAdapter.setAll(users, { ...state, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
