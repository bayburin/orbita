export const environment = {
  production: true,
  serverApiUrl: 'https://orbita-center.iss-reshetnev.ru/api/v1',
  actionCableUrl: 'wss://orbita-center.iss-reshetnev.ru/cable',
  serviceDeskApi: 'https://sd-center.iss-reshetnev.ru/api',
  auth: {
    clientId: '123',
    redirectUrl: 'https://orbita.iss-reshetnev.ru/oauth2/callback',
    serverUrl: 'https://orbita-center.iss-reshetnev.ru/api/v1/auth/token',
    appName: 'Орбита',
    jwtOptions: {
      allowedDomains: ['orbita-center.iss-reshetnev.ru'],
      disallowedRoutes: [],
    },
  },
};
