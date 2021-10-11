import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { SimpleFilter } from './../../../entities/filter.interface';
import {
  SdRequestsServerData,
  SdRequestServerData,
} from './../../../entities/server-data/sd-request-server-data.interface';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

/**
 * Содержит API заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class SdRequestApi implements SdRequestApiAbstract {
  readonly api = `${this.env.serverApiUrl}/sd_requests`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  query(page: number, perPage: number, filters: SimpleFilter) {
    const params = new HttpParams()
      .append('page', `${page}`)
      .append('perPage', `${perPage}`)
      .append('filters', `${JSON.stringify(filters)}`);

    return this.http.get<SdRequestsServerData>(this.api, { params });
  }

  show(id: number) {
    return this.http.get<SdRequestServerData>(`${this.api}/${id}`);
  }

  create(formData: FormData) {
    return this.http.post<SdRequestServerData>(this.api, formData);
  }

  update(id: number, formData: FormData) {
    return this.http.put<SdRequestServerData>(`${this.api}/${id}`, formData);
  }
}
