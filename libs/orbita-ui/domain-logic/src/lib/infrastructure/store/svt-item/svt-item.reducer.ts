import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SvtItemActions from './svt-item.actions';
import { SvtItem } from './../../../entities/models/svt/svt-item.interface';

export const SVT_ITEM_FEATURE_KEY = 'svtItem';

export interface State extends EntityState<SvtItem> {
  loading: boolean;
  loaded: boolean;
  selectedId: number;
  error?: string | null;
}

export interface SvtItemPartialState {
  readonly [SVT_ITEM_FEATURE_KEY]: State;
}

export function selectItemId(svtItem: SvtItem): number {
  return svtItem.barcode_item.id;
}

export const svtItemAdapter: EntityAdapter<SvtItem> = createEntityAdapter<SvtItem>({
  selectId: selectItemId,
});

export const initialState: State = svtItemAdapter.getInitialState({
  loading: false,
  loaded: false,
  selectedId: null,
  error: null,
});

const svtItemReducer = createReducer(
  initialState,
  on(SvtItemActions.loadSelected, (state) => ({ ...state, loading: true, loaded: false, error: null })),
  on(SvtItemActions.loadSelectedSuccess, (state, { svtItem }) =>
    svtItemAdapter.setOne(svtItem, { ...state, loading: false, loaded: true })
  ),
  on(SvtItemActions.loadSelectedNotFound, (state) => ({ ...state, loading: false, loaded: false })),
  on(SvtItemActions.loadSelectedFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(SvtItemActions.select, (state, { barcode }) => ({ ...state, selectedId: barcode })),
  on(SvtItemActions.clearSelected, (state) => ({ ...state, selectedId: null, loaded: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return svtItemReducer(state, action);
}
