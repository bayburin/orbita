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

export const svtItemAdapter: EntityAdapter<SvtItem> = createEntityAdapter<SvtItem>({
  selectId: (svtItem: SvtItem) => svtItem.barcode_item.id,
});

export const initialState: State = svtItemAdapter.getInitialState({
  loading: false,
  loaded: false,
  selectedId: null,
  error: null,
});

const svtItemReducer = createReducer(
  initialState,
  on(SvtItemActions.loadAll, SvtItemActions.loadSelected, SvtItemActions.loadAllForForm, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(SvtItemActions.loadAllSuccess, SvtItemActions.loadAllForFormSuccess, (state, { svtItems }) =>
    svtItemAdapter.setAll(svtItems, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(
    SvtItemActions.loadAllFailure,
    SvtItemActions.loadSelectedFailure,
    SvtItemActions.loadAllForFormFailure,
    (state, { error }) =>
      svtItemAdapter.removeAll({
        ...state,
        error,
        loading: false,
      })
  ),
  on(SvtItemActions.loadSelectedSuccess, (state, { svtItem }) =>
    svtItemAdapter.setOne(svtItem, { ...state, loading: false, loaded: true })
  ),
  on(SvtItemActions.loadSelectedNotFound, (state) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(SvtItemActions.select, (state, { barcode }) => ({
    ...state,
    selectedId: barcode,
  })),
  on(SvtItemActions.clearSelected, (state) => ({
    ...state,
    selectedId: null,
    loaded: false,
  })),
  on(SvtItemActions.clearAll, (state) => svtItemAdapter.removeAll({ ...state }))
);

export function reducer(state: State | undefined, action: Action) {
  return svtItemReducer(state, action);
}
