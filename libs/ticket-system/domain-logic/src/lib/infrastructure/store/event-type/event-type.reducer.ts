import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EventTypeActions from './event-type.actions';
import { EventType } from '../../../entities/models/event-type.interface';

export const EVENT_TYPE_FEATURE_KEY = 'eventType';

export interface State extends EntityState<EventType> {
  loaded: boolean;
  error?: string | null;
}

export interface EventTypePartialState {
  readonly [EVENT_TYPE_FEATURE_KEY]: State;
}

export const eventTypeAdapter: EntityAdapter<EventType> = createEntityAdapter<EventType>();

export const initialState: State = eventTypeAdapter.getInitialState({
  loaded: false,
});

const eventTypeReducer = createReducer(
  initialState,
  on(EventTypeActions.setAll, (state, { event_types }) =>
    eventTypeAdapter.setAll(event_types, { ...state, loaded: true })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return eventTypeReducer(state, action);
}
