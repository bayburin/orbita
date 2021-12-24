import { createSelector } from '@ngrx/store';

import { ATTACHMENT_FEATURE_KEY, State, attachmentAdapter, AttachmentPartialState } from './attachment.reducer';
import { getServiceDeskUiState } from './../index';

export const getAttachmentState = createSelector(
  getServiceDeskUiState,
  (state: AttachmentPartialState) => state[ATTACHMENT_FEATURE_KEY]
);

const { selectAll, selectEntities } = attachmentAdapter.getSelectors();

export const getLoaded = createSelector(getAttachmentState, (state: State) => state.loaded);

export const getAll = createSelector(getAttachmentState, (state: State) => selectAll(state));

export const getEntities = createSelector(getAttachmentState, (state: State) => selectEntities(state));

export const getLoadingIds = createSelector(getAttachmentState, (state: State) => state.loadingIds);

export const getErrorIds = createSelector(getAttachmentState, (state: State) => state.errorIds);
