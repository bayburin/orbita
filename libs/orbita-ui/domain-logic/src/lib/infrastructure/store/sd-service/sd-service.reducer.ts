import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SdServiceActions from './sd-service.actions';
import { SdService } from './../../../entities/models/sd/sd-service.interface';

export const SD_SERVICE_FEATURE_KEY = 'sdService';

export interface State extends EntityState<SdService> {
  loaded: boolean;
}

export interface SdServicePartialState {
  readonly [SD_SERVICE_FEATURE_KEY]: State;
}

export const sdServiceAdapter: EntityAdapter<SdService> = createEntityAdapter<SdService>();

export const initialState: State = sdServiceAdapter.getInitialState({
  loaded: false,
});

const sdServiceReducer = createReducer(
  initialState,
  on(SdServiceActions.setAll, (state, { services }) => sdServiceAdapter.setAll(services, { ...state, loaded: true }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdServiceReducer(state, action);
}
