import { createReducer, on, Action } from '@ngrx/store';

import * as LayoutActions from './layout.actions';

export const LAYOUT_FEATURE_KEY = 'layout';

export interface State {
  sidebarOpened: boolean;
}

export interface LayoutPartialState {
  readonly [LAYOUT_FEATURE_KEY]: State;
}

export const initialState: State = {
  sidebarOpened: true
};

const layoutReducer = createReducer(
  initialState,
  on(LayoutActions.openSidebar, (state) =>
    ({
      ...state,
      sidebarOpened: true
    })
  ),
  on(LayoutActions.closeSidebar, (state) => ({
    ...state,
    sidebarOpened: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutReducer(state, action);
}
