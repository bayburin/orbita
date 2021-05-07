import { State, initialState } from './layout.reducer';
import * as LayoutSelectors from './layout.selectors';

describe('LayoutSelectors', () => {
  let state: State;

  beforeEach(() => {
    state = { ...initialState }
  });

  it('getPage() should return "page" attribute', () => {
    expect(LayoutSelectors.getSidebarOpened.projector(state)).toBe(true);
  });
});
