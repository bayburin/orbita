import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  SVT_WORKPLACE_FEATURE_KEY,
  State,
  SvtWorkplacePartialState,
  svtWorkplaceAdapter,
} from './svt-workplace.reducer';

export const getSvtWorkplaceState = createSelector(
  getOrbitaUiState,
  (state: SvtWorkplacePartialState) => state[SVT_WORKPLACE_FEATURE_KEY]
);

const { selectAll, selectEntities } = svtWorkplaceAdapter.getSelectors();

export const getLoaded = createSelector(getSvtWorkplaceState, (state: State) => state.loaded);

export const getAll = createSelector(getSvtWorkplaceState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSvtWorkplaceState, (state: State) => selectEntities(state));
