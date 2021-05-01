import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FreeSdRequestTypeActions from './free-sd-request-type.actions';
import { FreeSdRequestType } from '../../../entities/free-sd-request-type.interface';

export const FREE_SD_REQUEST_TYPE_FEATURE_KEY = 'freeSdRequestType';

export interface State extends EntityState<FreeSdRequestType> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface FreeSdRequestTypePartialState {
  readonly [FREE_SD_REQUEST_TYPE_FEATURE_KEY]: State;
}

export const freeSdRequestTypeAdapter: EntityAdapter<FreeSdRequestType> = createEntityAdapter<FreeSdRequestType>();

export const initialState: State = freeSdRequestTypeAdapter.getInitialState({
  loaded: false,
});

const freeSdRequestTypeReducer = createReducer(
  initialState,
  on(FreeSdRequestTypeActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FreeSdRequestTypeActions.loadAllSuccess, (state, { freeSdRequestTypes }) =>
    freeSdRequestTypeAdapter.setAll(freeSdRequestTypes, { ...state, loaded: true })
  ),
  on(FreeSdRequestTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return freeSdRequestTypeReducer(state, action);
}
