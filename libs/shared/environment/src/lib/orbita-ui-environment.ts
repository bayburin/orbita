import { InjectionToken } from "@angular/core";

export interface IOrbitaUiEnvironment {
  production: boolean;
  serverApiUrl: string;
  serviceDeskApi: string;
  svtApi: string;
  auth: any;
}

export const ORBITA_UI_ENV_TOKEN = new InjectionToken<IOrbitaUiEnvironment>('Orbita UI environment config');
