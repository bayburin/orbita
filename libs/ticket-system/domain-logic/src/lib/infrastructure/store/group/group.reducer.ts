import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as GroupActions from './group.actions';
import { Group } from '../../../entities/models/group.interface';

export const GROUP_FEATURE_KEY = 'group';

export interface State extends EntityState<Group> {
  loaded: boolean;
}

export interface GroupPartialState {
  readonly [GROUP_FEATURE_KEY]: State;
}

export const groupAdapter: EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialState: State = groupAdapter.getInitialState({
  loaded: false
});

const groupReducer = createReducer(
  initialState,
  on(GroupActions.setAll, (state, { groups }) =>
    groupAdapter.setAll(groups, { ...state, loaded: true })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return groupReducer(state, action);
}
