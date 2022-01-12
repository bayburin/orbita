import { ServiceDeskUiEnvironment } from '@orbita/shared/environment';

export const environment: ServiceDeskUiEnvironment = {
  production: true,
  serverUrl: 'https://sd-center.iss-reshetnev.ru/api/v1',
  actionCableUrl: 'wss://sd-center.iss-reshetnev.ru/cable',
  versionCheckURL: 'https://service-desk.iss-reshetnev.ru/version.json',
  auth: {
    clientId: '46',
    redirectUrl: 'https://service-desk.iss-reshetnev.ru/oauth2/callback',
    serverUrl: 'https://sd-center.iss-reshetnev.ru/api/v1/auth/token',
    appName: 'Техподдержка',
    jwtOptions: {
      allowedDomains: ['sd-center.iss-reshetnev.ru'],
      disallowedRoutes: [] as string[],
    },
  },
};
