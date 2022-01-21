import { createSelector } from '@ngrx/store';

import { SERVICE_FEATURE_KEY, State, serviceAdapter, ServicePartialState } from './service.reducer';
import { getServiceDeskUiState } from './../index';

export const getServiceState = createSelector(
  getServiceDeskUiState,
  (state: ServicePartialState) => state[SERVICE_FEATURE_KEY]
);

const { selectAll, selectEntities } = serviceAdapter.getSelectors();

export const getLoaded = createSelector(getServiceState, (state: State) => state.loaded);

export const getLoading = createSelector(getServiceState, (state: State) => state.loading);

export const getError = createSelector(getServiceState, (state: State) => state.error);

export const getIds = createSelector(getServiceState, (state: State) => state.ids as number[]);

export const getAll = createSelector(getServiceState, (state: State) => selectAll(state));

export const getEntities = createSelector(getServiceState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getServiceState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
