import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ResponsibleUser } from '../../../entities/model/responsible-user.interface';
import * as ResponsibleUserActions from './responsible-user.actions';

export const RESPONSIBLE_USER_FEATURE_KEY = 'responsibleUser';

export interface State extends EntityState<ResponsibleUser> {}

export interface ResponsibleUserPartialState {
  readonly [RESPONSIBLE_USER_FEATURE_KEY]: State;
}

export const responsibleUserAdapter: EntityAdapter<ResponsibleUser> = createEntityAdapter<ResponsibleUser>();

export const initialState: State = responsibleUserAdapter.getInitialState({});

const responsibleUserReducer = createReducer(
  initialState,
  on(ResponsibleUserActions.setEntities, (state, { entities }) => ({
    ...state,
    entities: entities,
    ids: Object.keys(entities).map(Number),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return responsibleUserReducer(state, action);
}
