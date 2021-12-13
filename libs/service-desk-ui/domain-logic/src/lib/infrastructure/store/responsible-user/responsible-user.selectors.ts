import { createSelector } from '@ngrx/store';

import { getServiceDeskUiState } from './../index';
import {
  RESPONSIBLE_USER_FEATURE_KEY,
  State,
  ResponsibleUserPartialState,
  responsibleUserAdapter,
} from './responsible-user.reducer';

export const getResponsibleUserState = createSelector(
  getServiceDeskUiState,
  (state: ResponsibleUserPartialState) => state[RESPONSIBLE_USER_FEATURE_KEY]
);

const { selectAll, selectEntities } = responsibleUserAdapter.getSelectors();

export const getAll = createSelector(getResponsibleUserState, (state: State) => selectAll(state));

export const getEntities = createSelector(getResponsibleUserState, (state: State) => selectEntities(state));
