import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdRequestActions from './sd-request.actions';
import { SdRequest } from '../../entities/sd-request.interface';

export const SD_REQUEST_FEATURE_KEY = 'sdRequest';

export interface State extends EntityState<SdRequest> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface SdRequestPartialState {
  readonly [SD_REQUEST_FEATURE_KEY]: State;
}

export const sdRequestAdapter: EntityAdapter<SdRequest> = createEntityAdapter<SdRequest>();

export const initialState: State = sdRequestAdapter.getInitialState({
  loaded: false,
});

const sdRequestReducer = createReducer(
  initialState,
  on(SdRequestActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(SdRequestActions.loadAllSuccess, (state, { sdRequests }) =>
    sdRequestAdapter.setAll(sdRequests, { ...state, loaded: true })
  ),
  on(SdRequestActions.loadAllFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}
