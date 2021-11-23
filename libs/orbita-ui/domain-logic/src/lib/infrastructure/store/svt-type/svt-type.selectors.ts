import { createSelector } from '@ngrx/store';

import { getOrbitaUiState } from './../index';
import { SVT_TYPE_FEATURE_KEY, State, SvtTypePartialState, svtTypeAdapter } from './svt-type.reducer';

export const getSvtTypeState = createSelector(
  getOrbitaUiState,
  (state: SvtTypePartialState) => state[SVT_TYPE_FEATURE_KEY]
);

const { selectAll, selectEntities } = svtTypeAdapter.getSelectors();

export const getLoaded = createSelector(getSvtTypeState, (state: State) => state.loaded);

export const getAll = createSelector(getSvtTypeState, (state: State) => selectAll(state));

export const getEntities = createSelector(getSvtTypeState, (state: State) => selectEntities(state));
