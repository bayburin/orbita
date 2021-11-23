import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SvtWorkplaceTypeActions from './svt-workplace-type.actions';
import { SvtWorkplaceType } from './../../../entities/models/svt/svt-workplace-type.interface';

export const SVT_WORKPLACE_TYPE_FEATURE_KEY = 'svtWorkplaceType';

export interface State extends EntityState<SvtWorkplaceType> {
  loaded: boolean;
}

export interface SvtWorkplaceTypePartialState {
  readonly [SVT_WORKPLACE_TYPE_FEATURE_KEY]: State;
}

export const svtWorkplaceTypeAdapter: EntityAdapter<SvtWorkplaceType> = createEntityAdapter<SvtWorkplaceType>({
  selectId: (svtWorkplaceType: SvtWorkplaceType) => svtWorkplaceType.workplace_type_id,
});

export const initialState: State = svtWorkplaceTypeAdapter.getInitialState({
  loaded: false,
});

const svtWorkplaceTypeReducer = createReducer(
  initialState,
  on(SvtWorkplaceTypeActions.setAll, (state, { wpTypes }) =>
    svtWorkplaceTypeAdapter.setAll(wpTypes, { ...state, loaded: true })
  ),
  on(SvtWorkplaceTypeActions.clearAll, (state) => svtWorkplaceTypeAdapter.removeAll({ ...state, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return svtWorkplaceTypeReducer(state, action);
}
