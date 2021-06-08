import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ApplicationActions from './application.actions';
import { Application } from '../../../entities/models/application.interface';

export const APPLICATION_FEATURE_KEY = 'application';

export interface State extends EntityState<Application> {
  loaded: boolean;
}

export interface ApplicationPartialState {
  readonly [APPLICATION_FEATURE_KEY]: State;
}

export const applicationAdapter: EntityAdapter<Application> = createEntityAdapter<Application>();

export const initialState: State = applicationAdapter.getInitialState({
  loaded: false,
});

const applicationReducer = createReducer(
  initialState,
  on(ApplicationActions.setAll, (state, { applications }) =>
    applicationAdapter.setAll(applications, { ...state, loaded: true })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return applicationReducer(state, action);
}
