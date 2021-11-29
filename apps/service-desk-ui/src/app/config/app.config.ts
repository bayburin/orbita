import { InjectionToken } from '@angular/core';
import { AppConfigI } from '../core/interfaces/app-config.interface';

export const APP_CONFIG = new InjectionToken<AppConfigI>('config of app');

export const AppConfig: AppConfigI = {
  currentUserStorage: 'currentUser',
  currentTokenStorage: 'currentToken',
  minLengthSearch: 3,
  redirectAfterAuthorizeUrlName: 'returnUrl',
  authState: 'state',
  defaultUserDashboardListCount: 5,
  maxUserDashboardListCount: 100,
};
