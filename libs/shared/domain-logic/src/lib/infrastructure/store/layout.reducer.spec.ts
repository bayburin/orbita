import { Action } from '@ngrx/store';

import * as LayoutActions from './layout.actions';
import { State, initialState, reducer } from './layout.reducer';

describe('Layout Reducer', () => {
  let action: Action;

  describe('openSidebar', () => {
    it('should set sidebarOpened="true"', () => {
      action = LayoutActions.openSidebar();
      const result: State = reducer(initialState, action);

      expect(result.sidebarOpened).toBe(true);
    });
  });

  describe('closeSidebar', () => {
    it('should set sidebarOpened="false"', () => {
      action = LayoutActions.closeSidebar();
      const result: State = reducer(initialState, action);

      expect(result.sidebarOpened).toBe(false);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
