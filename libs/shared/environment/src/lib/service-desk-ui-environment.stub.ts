import { ServiceDeskUiEnvironment } from './service-desk-ui-environment';

export const serviceDeskUiEnvironmentStub: ServiceDeskUiEnvironment = {
  production: false,
  serverUrl: 'https://test/api/v1',
  authorizeUri: 'https://authorize',
  clientId: 999,
  actionCableUrl: 'wss://test/',
  versionCheckURL: 'https://fake-check',
};
