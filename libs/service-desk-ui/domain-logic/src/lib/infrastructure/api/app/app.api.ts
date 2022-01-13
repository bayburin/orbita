import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { AppApiAbstract } from './app.api.abstract';
import { Init } from './../../../entities/server-data/init.interface';
import { AppVersion } from './../../../entities/server-data/app-version.interface';

/**
 * Содержит API для обращения к серверу техподдержки в случаях, когда они не связаны с какими-то конкретными сущностями
 */
@Injectable({
  providedIn: 'root',
})
export class AppApi implements AppApiAbstract {
  readonly api = this.env.serverUrl;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  init() {
    return this.http.get<Init>(`${this.api}/init`);
  }

  appVersion() {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
    });

    return this.http.get<AppVersion>(this.env.versionCheckURL, { headers });
  }
}
