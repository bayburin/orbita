import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { SvtApiAbstract } from './svt.api.abstract';
import { SvtItem } from './../../../entities/models/svt/svt-item.interface';
import { PrimeFilter } from './../../../entities/prime-filter.interface';

/**
 * Содержит API заявок для обращения к серверу СВТ
 */
@Injectable({
  providedIn: 'root',
})
export class SvtApi implements SvtApiAbstract {
  readonly api = this.env.svtApi;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  show(barcode: number) {
    return this.http.get<SvtItem>(`${this.api}/api/v2/invent/items/${barcode}`);
  }

  queryItems(page: number, perPage: number, filters: PrimeFilter = {}) {
    const filterValues = Object.keys(filters).reduce((acc, key) => {
      acc[key] = filters[key].value;

      return acc;
    }, {} as { [key: string]: any });
    const params = new HttpParams()
      .append('page', `${page}`)
      .append('perPage', `${perPage}`)
      .append('filters', `${JSON.stringify(filterValues)}`);

    return this.http.get<SvtItem[]>(`${this.api}/api/v2/invent/items`, { params });
  }

  queryUserItems(idTn: number) {
    return this.http.get<SvtItem[]>(`${this.api}/user_isses/${idTn}/items`);
  }
}
