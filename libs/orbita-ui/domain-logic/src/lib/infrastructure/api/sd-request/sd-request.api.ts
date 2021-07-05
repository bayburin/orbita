import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { PrimeFilter } from './../../../entities/prime-filter.interface';
import {
  SdRequestsServerData,
  SdRequestServerData,
} from './../../../entities/server-data/sd-request-server-data.interface';
import { SdRequestApiAbstract } from './sd-request.api.abstract';
import { SdRequestForm } from './../../../entities/forms/sd-request-form.interface';

/**
 * Содержит API заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class SdRequestApi implements SdRequestApiAbstract {
  readonly api = `${this.env.serverApiUrl}/sd_requests`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  query(page: number, perPage: number, filters: PrimeFilter = {}) {
    const filterValues = Object.keys(filters).reduce((acc, key) => {
      acc[key] = filters[key].value;

      return acc;
    }, {} as { [key: string]: any });
    const params = new HttpParams()
      .append('page', `${page}`)
      .append('perPage', `${perPage}`)
      .append('filters', `${JSON.stringify(filterValues)}`);

    return this.http.get<SdRequestsServerData>(this.api, { params });
  }

  show(id: number) {
    return this.http.get<SdRequestServerData>(`${this.api}/${id}`);
  }

  update(id: number, formData: SdRequestForm) {
    return this.http.put<SdRequestServerData>(`${this.api}/${id}`, { sd_request: formData });
  }
}
