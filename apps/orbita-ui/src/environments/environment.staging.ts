export const environment = {
  production: false,
  serverApiUrl: 'https://orbita-center-test.iss-reshetnev.ru/api/v1',
  actionCableUrl: 'wss://orbita-center-test.iss-reshetnev.ru/cable',
  serviceDeskApi: 'https://sd-center.iss-reshetnev.ru/api',
  auth: {
    clientId: '108',
    redirectUrl: 'https://orbita-test.iss-reshetnev.ru/oauth2/callback',
    serverUrl: 'https://orbita-center-test.iss-reshetnev.ru/api/v1/auth/token',
    appName: 'Орбита (dev)',
    jwtOptions: {
      allowedDomains: ['orbita-center-test.iss-reshetnev.ru'],
      disallowedRoutes: [],
    },
  },
};
