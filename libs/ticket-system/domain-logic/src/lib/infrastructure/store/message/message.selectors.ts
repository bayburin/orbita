import { createSelector } from '@ngrx/store';

import { getTicketSystemState } from './../index';
import { MESSAGE_FEATURE_KEY, State, MessagePartialState, messageAdapter } from './message.reducer';

export const getMessageState = createSelector(
  getTicketSystemState,
  (state: MessagePartialState) => state[MESSAGE_FEATURE_KEY]
);

const { selectAll, selectEntities } = messageAdapter.getSelectors();

export const getMessageLoaded = createSelector(
  getMessageState,
  (state: State) => state.loaded
);

export const getMessageError = createSelector(
  getMessageState,
  (state: State) => state.error
);

export const getAllMessage = createSelector(
  getMessageState,
  (state: State) => selectAll(state)
);

export const getMessageEntities = createSelector(
  getMessageState,
  (state: State) => selectEntities(state)
);
