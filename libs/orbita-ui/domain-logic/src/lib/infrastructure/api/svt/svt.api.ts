import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { SvtApiAbstract } from './svt.api.abstract';
import { SvtItem } from './../../../entities/models/svt/svt-item.interface';
import { SvtFilters } from './../../../entities/filter.interface';

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

  queryItems(filters: SvtFilters) {
    const params = new HttpParams().append('filters', `${JSON.stringify(filters)}`);

    return this.http.get<SvtItem[]>(`${this.api}/items`, { params });
  }
}
