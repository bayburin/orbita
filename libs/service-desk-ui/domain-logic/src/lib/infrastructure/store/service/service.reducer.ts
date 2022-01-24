import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ServiceActions from './service.actions';
import { Service } from '../../../entities/models/service.interface';

export const SERVICE_FEATURE_KEY = 'service';

export interface State extends EntityState<Service> {
  selectedId?: number;
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface ServicePartialState {
  readonly [SERVICE_FEATURE_KEY]: State;
}

export const serviceAdapter: EntityAdapter<Service> = createEntityAdapter<Service>();

export const initialState: State = serviceAdapter.getInitialState({
  loading: false,
  loaded: false,
});

const serviceReducer = createReducer(
  initialState,
  on(ServiceActions.setEntities, (state, { entities }) => ({
    ...state,
    entities,
    ids: Object.keys(entities).map(Number),
  })),
  on(ServiceActions.loadSelected, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(ServiceActions.loadSelectedSuccess, (state, { service }) =>
    serviceAdapter.setOne(service, { ...state, selectedId: service.id, loaded: true, loading: false })
  ),
  on(ServiceActions.loadSelectedFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(ServiceActions.setAll, (state, { services }) => serviceAdapter.setAll(services, state)),

  // ========== Администрирование ==========

  on(ServiceActions.adminLoadAll, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(ServiceActions.adminLoadAllSuccess, (state, { entities, ids }) => ({
    ...state,
    loaded: true,
    loading: false,
    entities,
    ids,
  })),
  on(ServiceActions.adminLoadAllFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ServiceActions.adminDestroyWithDestroyedCategory, (state, { categoryId }) =>
    serviceAdapter.removeMany((service) => service.category_id === categoryId, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return serviceReducer(state, action);
}
