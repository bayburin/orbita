import { InjectionToken } from '@angular/core';
import { IConfig } from '@iss/ng-auth-center';

export interface ServiceDeskUiEnvironment {
  production: boolean;
  serverUrl: string;
  actionCableUrl: string;
  versionCheckURL: string;
  auth: IConfig;
}

export const SERVICE_DESK_UI_ENV_TOKEN = new InjectionToken<ServiceDeskUiEnvironment>(
  'Service Desk UI environment config'
);
