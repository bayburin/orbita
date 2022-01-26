import { initialState } from './admin-home.reducer';
import * as HomeSelectors from './admin-home.selectors';

describe('HomeSelectors', () => {
  const error = { message: 'error message' };
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      loaded: true,
      loading: true,
      categoryIds: [1, 2],
      serviceIds: [3, 4],
      error,
    };
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(HomeSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(HomeSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(HomeSelectors.getError.projector(state)).toEqual(error);
  });
});
