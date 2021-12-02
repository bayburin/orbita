import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { DashboardApiAbstract } from './dashboard.api.abstract';
import { Dashboard } from './../../../entities/server-data/dashboard.interface';

/**
 * Содержит API дашбоарда
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardApi implements DashboardApiAbstract {
  readonly api = `${this.env.serverUrl}/dashboard`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  loadDashboardData() {
    return this.http.get<Dashboard>(this.api);
  }
}
