import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { TAG_FEATURE_KEY, State, tagAdapter, TagPartialState } from './tag.reducer';

export const getTagState = createSelector(getServiceDeskUiState, (state: TagPartialState) => state[TAG_FEATURE_KEY]);
const { selectAll, selectEntities } = tagAdapter.getSelectors();

export const getAll = createSelector(getTagState, (state: State) => selectAll(state));

export const getEntities = createSelector(getTagState, (state: State) => selectEntities(state));
