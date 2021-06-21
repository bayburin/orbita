import { createReducer, on, Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
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
  selectedId?: string | number;
  loading: boolean;
  loaded: boolean;
  needTickets: boolean;
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
  loading: false,
  loaded: false,
  needTickets: true,
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
    filters: processSdRequestTableFilters(data.filters ? JSON.parse(JSON.stringify(data.filters)) : {}),
    needTickets: true,
  })),
  on(SdRequestActions.ReloadEntities, (state) => ({
    ...state,
    needTickets: true,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}

export function metaReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State | undefined, action: Action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(SD_REQUEST_FEATURE_KEY);

      if (storageValue) {
        try {
          const meta = JSON.parse(storageValue);

          return {
            ...state,
            [SD_REQUEST_FEATURE_KEY]: {
              ...initialState,
              firstRowIndex: meta.first,
              perPage: meta.rows,
              sortField: meta.sortField,
              sortOrder: meta.sortField,
              filters: processSdRequestTableFilters(meta.filters),
            },
          };
        } catch (e) {
          console.log('Ошибка. Не удалось считать данные фильтров из localStorage');
          console.log(e);
          localStorage.removeItem(SD_REQUEST_FEATURE_KEY);
        }
      }
    }

    return reducer(state, action);
  };
}
