import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { ATTACHMENT_FEATURE_KEY, State, AttachmentPartialState, attachmentAdapter } from './attachment.reducer';

export const getAttachmentState = createSelector(
  getOrbitaUiState,
  (state: AttachmentPartialState) => state[ATTACHMENT_FEATURE_KEY]
);

const { selectAll, selectEntities } = attachmentAdapter.getSelectors();

export const getLoaded = createSelector(getAttachmentState, (state: State) => state.loaded);

export const getAll = createSelector(getAttachmentState, (state: State) => selectAll(state));

export const getEntities = createSelector(getAttachmentState, (state: State) => selectEntities(state));
