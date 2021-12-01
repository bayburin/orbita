import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { ServiceApiAbstract } from './service.api.abstract';
import { Service } from '../../../entities/model/service.interface';

/**
 * Содержит API категорий
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceApi implements ServiceApiAbstract {
  readonly api = `${this.env.serverUrl}/services`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  show(id: number) {
    return this.http.get<Service>(`${this.api}/${id}`);
  }
}
