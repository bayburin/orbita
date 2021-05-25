import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ParameterActions from './parameter.actions';
import { Parameter } from './../../../entities/models/parameter.interface';

export const PARAMETER_FEATURE_KEY = 'parameter';

export interface State extends EntityState<Parameter> {
  loaded: boolean;
  error?: string | null;
}

export interface ParameterPartialState {
  readonly [PARAMETER_FEATURE_KEY]: State;
}

export const parameterAdapter: EntityAdapter<Parameter> = createEntityAdapter<Parameter>();

export const initialState: State = parameterAdapter.getInitialState({
  loaded: false
});

const parameterReducer = createReducer(
  initialState,
  on(ParameterActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ParameterActions.loadAllSuccess, (state, { parameters }) =>
    parameterAdapter.setAll(parameters, { ...state, loaded: true })
  ),
  on(ParameterActions.loadAllFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return parameterReducer(state, action);
}
