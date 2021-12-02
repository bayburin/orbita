import { initialState } from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';

describe('DashboardSelectors', () => {
  const error = { message: 'error message' };
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      loadedDashboard: true,
      loadingDashboard: true,
      error,
    };
  });

  it('getLoaded() should return "loadedDashboard" attribute', () => {
    expect(DashboardSelectors.getLoadedDashboard.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loadingDashboard" attribute', () => {
    expect(DashboardSelectors.getLoadingDashboard.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(DashboardSelectors.getError.projector(state)).toEqual(error);
  });
});
