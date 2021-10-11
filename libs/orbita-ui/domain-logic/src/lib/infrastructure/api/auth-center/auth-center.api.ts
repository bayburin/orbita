import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { AuthCenterApiAbstract } from './auth-center.api.abstract';
import { Host } from './../../../entities/models/host.interface';
import { HostsServerData } from './../../../entities/server-data/auth-center-server-data.interface';
import { HostFilter } from './../../../entities/filter.interface';

/**
 * Содержит API для обращения к серверу ЦА
 */
@Injectable({
  providedIn: 'root',
})
export class AuthCenterApi implements AuthCenterApiAbstract {
  readonly api = `${this.env.serverApiUrl}/auth_center`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  showHost(filters: HostFilter) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => (params = params.append(key, value)));

    return this.http.get<Host>(`${this.api}/show_host`, { params });
  }

  showEmployeeHosts(tn: number) {
    const params = new HttpParams().set('tn', `${tn}`);

    return this.http.get<HostsServerData>(`${this.api}/show_user_hosts`, { params });
  }
}
