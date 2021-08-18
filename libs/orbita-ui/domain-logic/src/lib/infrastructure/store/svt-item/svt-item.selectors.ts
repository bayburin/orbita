import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { SVT_ITEM_FEATURE_KEY, State, SvtItemPartialState, svtItemAdapter } from './svt-item.reducer';

export const getSvtItemState = createSelector(
  getOrbitaUiState,
  (state: SvtItemPartialState) => state[SVT_ITEM_FEATURE_KEY]
);

const { selectAll, selectEntities } = svtItemAdapter.getSelectors();

export const getLoading = createSelector(getSvtItemState, (state: State) => state.loading);

export const getLoaded = createSelector(getSvtItemState, (state: State) => state.loaded);

export const getError = createSelector(getSvtItemState, (state: State) => state.error);

export const getFormFilters = createSelector(getSvtItemState, (state: State) => state.formFilters);

export const getNeedFormItems = createSelector(getSvtItemState, (state: State) => state.needFormItems);

export const getAll = createSelector(getSvtItemState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSvtItemState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getSvtItemState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
