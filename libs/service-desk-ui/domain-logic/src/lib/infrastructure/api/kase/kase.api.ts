import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { KaseQueryResult } from './../../../entities/server-data/kase-query-result.interface';
import { KaseApiAbstract } from './kase.api.abstract';
import { KaseFilter } from '../../../entities/view-models/kase-filters.interface';

/**
 * Содержит API заявок
 */
@Injectable({
  providedIn: 'root',
})
export class KaseApi implements KaseApiAbstract {
  readonly api = `${this.env.serverUrl}/apps`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  query(filters: KaseFilter) {
    const params = new HttpParams().append('filters', JSON.stringify(filters));

    return this.http.get<KaseQueryResult>(this.api, { params });
  }
}
