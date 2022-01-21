import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { AdminServiceApiAbstract } from './admin-service.api.abstract';
import { Service } from '../../../../entities/models/service.interface';

/**
 * Содержит API услуг
 */
@Injectable({
  providedIn: 'root',
})
export class AdminServiceApi implements AdminServiceApiAbstract {
  readonly api = `${this.env.serverUrl}/admin/services`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  query() {
    return this.http.get<Service[]>(this.api);
  }

  show(id: number) {
    return this.http.get<Service>(`${this.api}/${id}`);
  }
}
