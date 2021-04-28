import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SD_REQUEST_FEATURE_KEY, State, SdRequestPartialState, sdRequestAdapter } from './sd-request.reducer';

export const getSdRequestState = createFeatureSelector<SdRequestPartialState, State>(SD_REQUEST_FEATURE_KEY);

const { selectAll, selectEntities } = sdRequestAdapter.getSelectors();

export const getLoaded = createSelector(
  getSdRequestState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getSdRequestState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getSdRequestState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getSdRequestState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSdRequestState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
