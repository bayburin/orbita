import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AttachmentActions from './attachment.actions';
import { Attachment } from '../../../entities/model/attachment.interface';

export const ATTACHMENT_FEATURE_KEY = 'attachment';

export interface State extends EntityState<Attachment> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface AttachmentPartialState {
  readonly [ATTACHMENT_FEATURE_KEY]: State;
}

export const attachmentAdapter: EntityAdapter<Attachment> = createEntityAdapter<Attachment>();

export const initialState: State = attachmentAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const attachmentReducer = createReducer(
  initialState,
  on(AttachmentActions.setEntities, (state, { entities }) => ({
    ...state,
    entities,
    ids: Object.keys(entities).map(Number),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return attachmentReducer(state, action);
}
