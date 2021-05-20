import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MessageActions from './message.actions';
import { Message } from '../../../entities/message.interface';

export const MESSAGE_FEATURE_KEY = 'message';

export interface State extends EntityState<Message> {
  loaded: boolean;
  error?: string | null;
}

export interface MessagePartialState {
  readonly [MESSAGE_FEATURE_KEY]: State;
}

export const messageAdapter: EntityAdapter<Message> = createEntityAdapter<Message>();

export const initialState: State = messageAdapter.getInitialState({
  loaded: false,
});

const messageReducer = createReducer(
  initialState,
  on(MessageActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MessageActions.loadAllSuccess, (state, { messageQueue }) =>
    messageAdapter.setAll(messageQueue.messages, { ...state, loaded: true })
  ),
  on(MessageActions.loadAllFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return messageReducer(state, action);
}
