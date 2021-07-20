import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AttachmentActions from './attachment.actions';
import { Attachment } from './../../../entities/models/attachment.interface';

export const ATTACHMENT_FEATURE_KEY = 'attachment';

export interface State extends EntityState<Attachment> {
  loaded: boolean;
  loadingIds: number[];
  errorIds: number[];
}

export interface AttachmentPartialState {
  readonly [ATTACHMENT_FEATURE_KEY]: State;
}

export const attachmentAdapter: EntityAdapter<Attachment> = createEntityAdapter<Attachment>();

export const initialState: State = attachmentAdapter.getInitialState({
  loaded: false,
  loadingIds: [],
  errorIds: [],
});

const attachmentReducer = createReducer(
  initialState,
  on(AttachmentActions.setAll, (state, { attachments }) =>
    attachmentAdapter.setAll(attachments, { ...state, loaded: true })
  ),
  on(AttachmentActions.setAttachments, (state, { attachments }) => attachmentAdapter.upsertMany(attachments, state)),
  on(AttachmentActions.download, (state, { attachment }) => ({
    ...state,
    loadingIds: [...state.loadingIds, attachment.id],
    errorIds: state.errorIds.filter((loadingId) => loadingId !== attachment.id),
  })),
  on(AttachmentActions.downloadSuccess, (state, { id }) => ({
    ...state,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
  })),
  on(AttachmentActions.downloadFailure, (state, { id }) => ({
    ...state,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
    errorIds: [...state.errorIds, id],
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return attachmentReducer(state, action);
}
