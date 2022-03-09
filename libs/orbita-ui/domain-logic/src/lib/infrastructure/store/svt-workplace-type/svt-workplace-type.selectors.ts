import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import {
  SVT_WORKPLACE_TYPE_FEATURE_KEY,
  State,
  SvtWorkplaceTypePartialState,
  svtWorkplaceTypeAdapter,
} from './svt-workplace-type.reducer';

export const getSvtWorkplaceTypeState = createSelector(
  getOrbitaUiState,
  (state: SvtWorkplaceTypePartialState) => state[SVT_WORKPLACE_TYPE_FEATURE_KEY]
);

const { selectAll, selectEntities } = svtWorkplaceTypeAdapter.getSelectors();

export const getLoaded = createSelector(getSvtWorkplaceTypeState, (state: State) => state.loaded);

export const getAll = createSelector(getSvtWorkplaceTypeState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSvtWorkplaceTypeState, (state: State) => selectEntities(state));
