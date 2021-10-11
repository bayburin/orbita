import { initialState } from './app.reducer';
import * as AppSelectors from './app.selectors';

describe('AppSelectors', () => {
  const error = { message: 'error message' };
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      loaded: true,
      error,
    };
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(AppSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(AppSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(AppSelectors.getError.projector(state)).toEqual(error);
  });
});
