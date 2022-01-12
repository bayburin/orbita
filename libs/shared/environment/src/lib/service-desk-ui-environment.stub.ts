import { ServiceDeskUiEnvironment } from './service-desk-ui-environment';

export const serviceDeskUiEnvironmentStub: ServiceDeskUiEnvironment = {
  production: false,
  serverUrl: 'https://test/api/v1',
  actionCableUrl: 'wss://test/',
  versionCheckURL: 'https://fake-check',
  auth: {
    clientId: '999',
    redirectUrl: 'https://test/api/v1/oauth2/callback',
    serverUrl: 'https://test/token',
    appName: 'Техподдержка (dev)',
    jwtOptions: {
      allowedDomains: ['test'],
      disallowedRoutes: [] as string[],
    },
  },
};
