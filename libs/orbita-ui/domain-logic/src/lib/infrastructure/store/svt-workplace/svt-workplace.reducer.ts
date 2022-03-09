import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SvtWorkplaceActions from './svt-workplace.actions';
import { SvtWorkplace } from './../../../entities/models/svt/svt-workplace.interface';

export const SVT_WORKPLACE_FEATURE_KEY = 'svtWorkplace';

export interface State extends EntityState<SvtWorkplace> {
  loaded: boolean;
}

export interface SvtWorkplacePartialState {
  readonly [SVT_WORKPLACE_FEATURE_KEY]: State;
}

export const svtWorkplaceAdapter: EntityAdapter<SvtWorkplace> = createEntityAdapter<SvtWorkplace>({
  selectId: (svtWorkplace: SvtWorkplace) => svtWorkplace.workplace_id,
});

export const initialState: State = svtWorkplaceAdapter.getInitialState({
  loaded: false,
});

const svtWorkplaceReducer = createReducer(
  initialState,
  on(SvtWorkplaceActions.setAll, (state, { workplaces }) =>
    svtWorkplaceAdapter.setAll(workplaces, { ...state, loaded: true })
  ),
  on(SvtWorkplaceActions.clearAll, (state) => svtWorkplaceAdapter.removeAll({ ...state, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return svtWorkplaceReducer(state, action);
}
