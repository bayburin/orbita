import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdRequestActions from './sd-request.actions';
import { SdRequest } from '../../../entities/models/sd-request.interface';
import { PrimeFilter } from './../../../entities/prime-filter.interface';
import { processSdRequestTableFilters } from '../../utils/process-sd-request-table-filters.function';

export const SD_REQUEST_FEATURE_KEY = 'sdRequest';

export interface State extends EntityState<SdRequest> {
  firstRowIndex: number;
  totalCount: number;
  perPage: number;
  sortField: string;
  sortOrder: number;
  filters: PrimeFilter;
  selected: SdRequest;
  loading: boolean;
  loaded: boolean;
  needTickets: boolean;
  needTicket: boolean;
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
  filters: {},
  selected: null,
  loading: false,
  loaded: false,
  needTickets: true,
  needTicket: true,
});

const sdRequestReducer = createReducer(
  initialState,
  on(SdRequestActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    needTickets: false,
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
      loading: false,
    })
  ),
  on(SdRequestActions.SetTableMetadata, (state, { data }) => ({
    ...state,
    firstRowIndex: data.first,
    perPage: data.rows,
    sortField: data.sortField,
    sortOrder: data.sortOrder,
    filters: processSdRequestTableFilters(data.filters ? JSON.parse(JSON.stringify(data.filters)) : {}),
    needTickets: true,
  })),
  on(SdRequestActions.ReloadEntities, (state) => ({
    ...state,
    needTickets: true,
  })),
  on(SdRequestActions.loadSelected, (state) => ({
    ...state,
    selected: null,
    loaded: false,
    loading: true,
    needTicket: false,
    error: null,
  })),
  on(SdRequestActions.loadSelectedSuccess, (state, { sdRequest }) => ({
    ...state,
    selected: sdRequest,
    loading: false,
    loaded: true,
  })),
  on(SdRequestActions.loadSelectedFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}
