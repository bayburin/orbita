import { createReducer, on, Action, ActionReducer, MetaReducer, INIT, UPDATE } from '@ngrx/store';

import * as LayoutActions from './layout.actions';

export const LAYOUT_FEATURE_KEY = 'layout';

export interface State {
  sidebarOpened: boolean;
  theme: string;
  adBlock: boolean;
}

export interface LayoutPartialState {
  readonly [LAYOUT_FEATURE_KEY]: State;
}

export const initialState: State = {
  sidebarOpened: true,
  theme: 'saga-blue-theme.css',
  adBlock: false,
};

const layoutReducer = createReducer(
  initialState,
  on(LayoutActions.openSidebar, (state) => ({
    ...state,
    sidebarOpened: true,
  })),
  on(LayoutActions.closeSidebar, (state) => ({
    ...state,
    sidebarOpened: false,
  })),
  on(LayoutActions.setTheme, (state, { theme }) => ({ ...state, theme }))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutReducer(state, action);
}

export function layoutMetaReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State | undefined, action: Action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(LAYOUT_FEATURE_KEY);

      if (storageValue) {
        try {
          const layout = JSON.parse(storageValue);

          return {
            ...state,
            ...layout,
            theme: layout.theme || initialState.theme,
          };
        } catch (e) {
          console.log('Ошибка. Не удалось считать данные layout из localStorage');
          console.log(e);
          localStorage.removeItem(LAYOUT_FEATURE_KEY);
        }
      }
    }

    if (
      action.type === '[Layout] Open Sidebar' ||
      action.type === '[Layout] Close Sidebar' ||
      action.type === '[Layout] Set Theme'
    ) {
      const nextState = reducer(state, action);

      localStorage.setItem(LAYOUT_FEATURE_KEY, JSON.stringify({ ...nextState }));

      return nextState;
    }
    return reducer(state, action);
  };
}
