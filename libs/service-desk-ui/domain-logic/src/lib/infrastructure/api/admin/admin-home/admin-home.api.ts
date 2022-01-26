import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { AdminHomeApiAbstract } from './admin-home.api.abstract';
import { AdminHome } from '../../../../entities/server-data/admin-home.interface';

/**
 * Содержит API дашбоарда
 */
@Injectable({
  providedIn: 'root',
})
export class AdminHomeApi implements AdminHomeApiAbstract {
  readonly api = `${this.env.serverUrl}/admin/home`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  loadHomeData() {
    return this.http.get<AdminHome>(this.api);
  }
}
