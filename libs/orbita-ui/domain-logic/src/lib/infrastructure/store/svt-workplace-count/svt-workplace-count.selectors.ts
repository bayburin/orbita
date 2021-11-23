import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  SVT_WORKPLACE_COUNT_FEATURE_KEY,
  State,
  SvtWorkplaceCountPartialState,
  svtWorkplaceCountAdapter,
} from './svt-workplace-count.reducer';

export const getSvtWorkplaceCountState = createSelector(
  getOrbitaUiState,
  (state: SvtWorkplaceCountPartialState) => state[SVT_WORKPLACE_COUNT_FEATURE_KEY]
);

const { selectAll, selectEntities } = svtWorkplaceCountAdapter.getSelectors();

export const getLoaded = createSelector(getSvtWorkplaceCountState, (state: State) => state.loaded);

export const getAll = createSelector(getSvtWorkplaceCountState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSvtWorkplaceCountState, (state: State) => selectEntities(state));
