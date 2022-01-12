import { initialState } from './app.reducer';
import * as AppSelectors from './app.selectors';

describe('AppSelectors', () => {
  const appVersion = '1.2';
  const appHash = 'asdjh12313asjkd';
  let state: any;

  beforeEach(() => {
    state = {
      ...initialState,
      loaded: true,
      appVersion,
      appHash,
    };
  });

  it('getAppVersion() should return "appVersion" attribute', () => {
    expect(AppSelectors.getAppVersion.projector(state)).toBe(appVersion);
  });

  it('getAppHash() should return "appHash" attribute', () => {
    expect(AppSelectors.getAppHash.projector(state)).toBe(appHash);
  });
});
