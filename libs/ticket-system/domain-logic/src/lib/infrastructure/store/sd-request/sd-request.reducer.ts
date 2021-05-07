import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdRequestActions from './sd-request.actions';
import { SdRequest } from '../../../entities/sd-request.interface';

export const SD_REQUEST_FEATURE_KEY = 'sdRequest';

export interface State extends EntityState<SdRequest> {
  page: number;
  totalPages: number | null;
  totalCount: number | null;
  maxSize: number;
  selectedId?: string | number;
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface SdRequestPartialState {
  readonly [SD_REQUEST_FEATURE_KEY]: State;
}

export const sdRequestAdapter: EntityAdapter<SdRequest> = createEntityAdapter<SdRequest>();

export const initialState: State = sdRequestAdapter.getInitialState({
  page: 1,
  totalPages: 1,
  totalCount: 0,
  maxSize: 5,
  loading: false,
  loaded: false,
});

const sdRequestReducer = createReducer(
  initialState,
  on(SdRequestActions.loadAll, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(SdRequestActions.loadAllSuccess, (state, { sdRequestQueue }) =>
    sdRequestAdapter.setAll(sdRequestQueue.sd_requests, {
      ...state,
      totalPages: sdRequestQueue.meta.total_pages,
      totalCount: sdRequestQueue.meta.total_count,
      loading: false,
      loaded: true
    })
  ),
  on(SdRequestActions.loadAllFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    totalCount: 0
  })),
  on(SdRequestActions.SetPage, (state, { page }) => ({
    ...state,
    page: page
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}
