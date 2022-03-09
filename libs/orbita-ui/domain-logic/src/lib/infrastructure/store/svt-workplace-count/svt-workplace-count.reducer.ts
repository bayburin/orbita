import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SvtWorkplaceCountActions from './svt-workplace-count.actions';
import { SvtWorkplaceCount } from './../../../entities/models/svt/svt-workplace-count.interface';

export const SVT_WORKPLACE_COUNT_FEATURE_KEY = 'svtWorkplaceCount';

export interface State extends EntityState<SvtWorkplaceCount> {
  loaded: boolean;
}

export interface SvtWorkplaceCountPartialState {
  readonly [SVT_WORKPLACE_COUNT_FEATURE_KEY]: State;
}

export const svtWorkplaceCountAdapter: EntityAdapter<SvtWorkplaceCount> = createEntityAdapter<SvtWorkplaceCount>({
  selectId: (svtWorkplaceCount: SvtWorkplaceCount) => svtWorkplaceCount.workplace_count_id,
});

export const initialState: State = svtWorkplaceCountAdapter.getInitialState({
  loaded: false,
});

const svtWorkplaceCountReducer = createReducer(
  initialState,
  on(SvtWorkplaceCountActions.setAll, (state, { wpCounts }) =>
    svtWorkplaceCountAdapter.setAll(wpCounts, { ...state, loaded: true })
  ),
  on(SvtWorkplaceCountActions.clearAll, (state) => svtWorkplaceCountAdapter.removeAll({ ...state, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return svtWorkplaceCountReducer(state, action);
}
