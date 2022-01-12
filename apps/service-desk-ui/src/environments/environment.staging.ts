import { ServiceDeskUiEnvironment } from '@orbita/shared/environment';

export const environment: ServiceDeskUiEnvironment = {
  production: true,
  serverUrl: 'https://web-stage.iss-reshetnev.ru:8081/api/v1',
  actionCableUrl: 'wss://web-stage.iss-reshetnev.ru:8081/cable',
  versionCheckURL: 'https://web-stage.iss-reshetnev.ru/version.json',
  auth: {
    clientId: '70',
    redirectUrl: 'https://web-stage.iss-reshetnev.ru/oauth2/callback',
    serverUrl: 'https://web-stage.iss-reshetnev.ru:8081/api/v1/auth/token',
    appName: 'Техподдержка (stage)',
    jwtOptions: {
      allowedDomains: ['web-stage.iss-reshetnev.ru:8081'],
      disallowedRoutes: [] as string[],
    },
  },
};
