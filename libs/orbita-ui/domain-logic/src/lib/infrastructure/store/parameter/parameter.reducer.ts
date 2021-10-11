import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ParameterActions from './parameter.actions';
import { Parameter } from './../../../entities/models/parameter.interface';

export const PARAMETER_FEATURE_KEY = 'parameter';

export interface State extends EntityState<Parameter> {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface ParameterPartialState {
  readonly [PARAMETER_FEATURE_KEY]: State;
}

export const parameterAdapter: EntityAdapter<Parameter> = createEntityAdapter<Parameter>();

export const initialState: State = parameterAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

const parameterReducer = createReducer(
  initialState,
  on(ParameterActions.loadAll, (state) => ({ ...state, loading: true, loaded: false, error: null })),
  on(ParameterActions.loadAllSuccess, (state, { parameters }) =>
    parameterAdapter.setAll(parameters, { ...state, loading: false, loaded: true })
  ),
  on(ParameterActions.loadAllFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(ParameterActions.clearAll, (state) => parameterAdapter.removeAll({ ...state, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return parameterReducer(state, action);
}
