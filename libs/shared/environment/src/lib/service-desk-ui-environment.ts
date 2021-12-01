import { InjectionToken } from '@angular/core';

export interface ServiceDeskUiEnvironment {
  production: boolean;
  serverUrl: string;
  authorizeUri: string;
  clientId: number;
  actionCableUrl: string;
  versionCheckURL: string;
}

export const SERVICE_DESK_UI_ENV_TOKEN = new InjectionToken<ServiceDeskUiEnvironment>(
  'Service Desk UI environment config'
);
