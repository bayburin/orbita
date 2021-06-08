import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdRequestActions from './sd-request.actions';
import { SdRequest } from '../../../entities/models/sd-request.interface';

export const SD_REQUEST_FEATURE_KEY = 'sdRequest';

export interface State extends EntityState<SdRequest> {
  firstRowIndex: number;
  totalCount: number;
  perPage: number;
  sortField: string;
  sortOrder: number;
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
  firstRowIndex: 0,
  totalCount: 0,
  sortField: 'id',
  sortOrder: -1,
  perPage: 25,
  loading: false,
  loaded: false,
});

const sdRequestReducer = createReducer(
  initialState,
  on(SdRequestActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SdRequestActions.loadAllSuccess, (state, { sdRequests, meta }) =>
    sdRequestAdapter.setAll(sdRequests, {
      ...state,
      totalCount: meta.total_count,
      loading: false,
      loaded: true,
    })
  ),
  on(SdRequestActions.loadAllFailure, (state, { error }) =>
    sdRequestAdapter.removeAll({
      ...state,
      error,
      selectedId: null,
      loading: false,
    })
  ),
  on(SdRequestActions.SetTableMetadata, (state, { data }) => ({
    ...state,
    firstRowIndex: data.first,
    perPage: data.rows,
    sortField: data.sortField,
    sortOrder: data.sortOrder,
    loaded: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}