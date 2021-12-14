import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Tag } from './../../../entities/model/tag.interface';
import * as TagActions from './tag.actions';

export const TAG_FEATURE_KEY = 'tag';

export interface State extends EntityState<Tag> {}

export interface TagPartialState {
  readonly [TAG_FEATURE_KEY]: State;
}

export const tagAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const initialState: State = tagAdapter.getInitialState({});

const tagReducer = createReducer(
  initialState,
  on(TagActions.setEntities, (state, { entities }) => ({
    ...state,
    entities: entities,
    ids: Object.keys(entities).map(Number),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return tagReducer(state, action);
}
