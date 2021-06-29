import { InjectionToken } from '@angular/core';

export interface OrbitaUiEnvironment {
  production: boolean;
  serverApiUrl: string;
  actionCableUrl: string;
  serviceDeskApi: string;
  auth: any;
}

export const ORBITA_UI_ENV_TOKEN = new InjectionToken<OrbitaUiEnvironment>('Orbita UI environment config');
