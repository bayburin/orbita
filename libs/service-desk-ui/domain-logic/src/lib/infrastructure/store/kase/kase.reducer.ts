import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as KaseActions from './kase.actions';
import { Kase } from './../../../entities/model/kase.interface';
import { KaseStatus } from '../../../entities/model/kase-status.interface';

export const KASE_FEATURE_KEY = 'kase';

export interface State extends EntityState<Kase> {
  initLoading: boolean;
  loading: boolean;
  loaded: boolean;
  serviceIds: number[];
  statuses?: KaseStatus[];
  error?: string | null;
}

export interface KasePartialState {
  readonly [KASE_FEATURE_KEY]: State;
}

export const kaseAdapter: EntityAdapter<Kase> = createEntityAdapter<Kase>({
  selectId: (kase: Kase) => kase.case_id,
});

export const initialState: State = kaseAdapter.getInitialState({
  initLoading: false,
  loading: false,
  loaded: false,
  serviceIds: [],
});

const kaseReducer = createReducer(
  initialState,
  on(KaseActions.init, (state) => ({ ...state, loaded: false, initLoading: true, error: null })),
  on(KaseActions.loadAll, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(KaseActions.loadAllSuccess, (state, { kases }) =>
    kaseAdapter.setAll(kases, { ...state, loaded: true, loading: false, initLoading: false })
  ),
  on(KaseActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, initLoading: false, error })),
  on(KaseActions.setStatuses, (state, { statuses }) => ({ ...state, statuses })),
  on(KaseActions.setServiceIds, (state, { serviceIds }) => ({ ...state, serviceIds }))
);

export function reducer(state: State | undefined, action: Action) {
  return kaseReducer(state, action);
}
