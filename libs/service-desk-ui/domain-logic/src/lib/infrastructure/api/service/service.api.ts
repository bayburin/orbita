import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { ServiceApiAbstract } from './service.api.abstract';
import { ServiceOverviewVM } from '../../../entities/view-models/service-overview-vm.interface';

/**
 * Содержит API услуг
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceApi implements ServiceApiAbstract {
  readonly api = `${this.env.serverUrl}/services`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  show(id: number) {
    return this.http.get<ServiceOverviewVM>(`${this.api}/${id}`);
  }
}
