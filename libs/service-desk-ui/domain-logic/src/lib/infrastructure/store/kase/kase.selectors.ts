import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import { KASE_FEATURE_KEY, State, kaseAdapter, KasePartialState } from './kase.reducer';

export const getKaseState = createSelector(getServiceDeskUiState, (state: KasePartialState) => state[KASE_FEATURE_KEY]);

const { selectAll, selectEntities } = kaseAdapter.getSelectors();

export const getLoaded = createSelector(getKaseState, (state: State) => state.loaded);

export const getLoading = createSelector(getKaseState, (state: State) => state.loading);

export const getInitLoading = createSelector(getKaseState, (state: State) => state.initLoading);

export const getError = createSelector(getKaseState, (state: State) => state.error);

export const getAll = createSelector(getKaseState, (state: State) => selectAll(state));

export const getEntities = createSelector(getKaseState, (state: State) => selectEntities(state));

export const getStatuses = createSelector(getKaseState, (state: State) => state.statuses);

export const getServiceIds = createSelector(getKaseState, (state: State) => state.serviceIds);
