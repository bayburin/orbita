import { State, initialState } from './layout.reducer';
import * as LayoutSelectors from './layout.selectors';

describe('LayoutSelectors', () => {
  let state: State;

  beforeEach(() => {
    state = {
      ...initialState,
      theme: 'fake-theme',
    };
  });

  it('getSidebarOpened() should return "sidebarOpened" attribute', () => {
    expect(LayoutSelectors.getSidebarOpened.projector(state)).toBe(true);
  });

  it('getTheme() should return "theme" attribute', () => {
    expect(LayoutSelectors.getTheme.projector(state)).toEqual('fake-theme');
  });
});
