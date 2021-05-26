import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { PARAMETER_FEATURE_KEY, State, ParameterPartialState, parameterAdapter } from './parameter.reducer';

export const getParameterState = createSelector(
  getTicketSystemState,
  (state: ParameterPartialState) => state[PARAMETER_FEATURE_KEY]
);

const { selectAll, selectEntities } = parameterAdapter.getSelectors();

export const getLoaded = createSelector(
  getParameterState,
  (state: State) => state.loaded
);

export const getError = createSelector(
  getParameterState,
  (state: State) => state.error
);

export const getAll = createSelector(
  getParameterState,
  (state: State) => selectAll(state)
);

export const getEntities = createSelector(
  getParameterState,
  (state: State) => selectEntities(state)
);