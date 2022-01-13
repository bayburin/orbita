import { initialState } from './app.reducer';
import * as AppSelectors from './app.selectors';

describe('AppSelectors', () => {
  const error = { message: 'error message' };
  const appVersion = '1.2';
  const appHash = 'asdjh12313asjkd';
  const serverDate = new Date().toString();
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      loading: false,
      loaded: true,
      error,
      appVersion,
      appHash,
      serverDate,
    };
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(AppSelectors.getLoading.projector(state)).toBe(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(AppSelectors.getLoaded.projector(state)).toBe(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(AppSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAppVersion() should return "appVersion" attribute', () => {
    expect(AppSelectors.getAppVersion.projector(state)).toBe(appVersion);
  });

  it('getAppHash() should return "appHash" attribute', () => {
    expect(AppSelectors.getAppHash.projector(state)).toBe(appHash);
  });

  it('getServerDate() should return "serverDate" attribute', () => {
    expect(AppSelectors.getServerDate.projector(state)).toEqual(serverDate);
  });
});
