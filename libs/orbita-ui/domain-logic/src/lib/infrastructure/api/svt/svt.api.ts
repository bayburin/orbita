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
  readonly api = `${this.env.serverApiUrl}/svt`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  showItem(barcode: number) {
    return this.http.get<SvtItem>(`${this.api}/find_by_barcode/${barcode}`);
  }

  queryItems(filters: PrimeFilter = {}) {
    const filterValues = Object.keys(filters).reduce((acc, key) => {
      acc[key] = filters[key].value;

      return acc;
    }, {} as { [key: string]: any });
    const params = new HttpParams().append('filters', `${JSON.stringify(filterValues)}`);

    return this.http.get<SvtItem[]>(`${this.api}/items`, { params });
  }
}
