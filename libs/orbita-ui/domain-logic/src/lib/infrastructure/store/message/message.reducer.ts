import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MessageActions from './message.actions';
import { Message } from '../../../entities/models/message.interface';

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
  on(MessageActions.setAll, (state, { messages }) => messageAdapter.setAll(messages, { ...state, loaded: true })),
  on(MessageActions.setMessages, (state, { messages }) => messageAdapter.upsertMany(messages, state)),
  on(MessageActions.clearAll, (state) => messageAdapter.removeAll({ ...state, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return messageReducer(state, action);
}
