import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LAYOUT_FEATURE_KEY, State, LayoutPartialState } from './layout.reducer';

export const getLayoutState = createFeatureSelector<LayoutPartialState, State>(LAYOUT_FEATURE_KEY);

export const getSidebarOpened = createSelector(getLayoutState, (state: State) => state.sidebarOpened);

export const getTheme = createSelector(getLayoutState, (state: State) => state.theme);
