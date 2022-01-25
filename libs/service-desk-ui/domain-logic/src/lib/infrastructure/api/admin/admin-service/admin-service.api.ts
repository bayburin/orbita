import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { AdminServiceApiAbstract } from './admin-service.api.abstract';
import { Service } from '../../../../entities/models/service.interface';
import { ServiceForm } from '../../../../entities/form/service-form.interface';
import { ServiceOverviewVM } from '../../../../entities/view-models/service-overview-vm.interface';

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
    return this.http.get<ServiceOverviewVM[]>(this.api);
  }

  show(id: number) {
    return this.http.get<ServiceOverviewVM>(`${this.api}/${id}`);
  }

  save(formData: ServiceForm) {
    return this.http.post<ServiceOverviewVM>(this.api, { service: formData });
  }

  update(id: number, formData: ServiceForm) {
    return this.http.put<ServiceOverviewVM>(`${this.api}/${id}`, { service: formData });
  }

  destroy(id: number) {
    return this.http.delete<Service>(`${this.api}/${id}`);
  }
}
