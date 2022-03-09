import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SvtTypeActions from './svt-type.actions';
import { SvtType } from './../../../entities/models/svt/svt-type.interface';

export const SVT_TYPE_FEATURE_KEY = 'svtType';

export interface State extends EntityState<SvtType> {
  loaded: boolean;
}

export interface SvtTypePartialState {
  readonly [SVT_TYPE_FEATURE_KEY]: State;
}

export const svtTypeAdapter: EntityAdapter<SvtType> = createEntityAdapter<SvtType>({
  selectId: (svtType: SvtType) => svtType.type_id,
});

export const initialState: State = svtTypeAdapter.getInitialState({
  loaded: false,
});

const svtTypeReducer = createReducer(
  initialState,
  on(SvtTypeActions.setAll, (state, { svtTypes }) => svtTypeAdapter.setAll(svtTypes, { ...state, loaded: true })),
  on(SvtTypeActions.clearAll, (state) => svtTypeAdapter.removeAll({ ...state, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return svtTypeReducer(state, action);
}
