import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { HomeApiAbstract } from './home.api.abstract';
import { Home } from '../../../entities/server-data/home.interface';
import { SearchResult } from '../../../entities/server-data/search-result.interface';

/**
 * Содержит API дашбоарда
 */
@Injectable({
  providedIn: 'root',
})
export class HomeApi implements HomeApiAbstract {
  readonly api = `${this.env.serverUrl}/dashboard`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  loadHomeData() {
    return this.http.get<Home>(this.api);
  }

  search(searchValue: string) {
    const params = new HttpParams().set('search', searchValue);

    return this.http.get<SearchResult>(`${this.api}/search`, { params });
  }

  deepSearch(searchValue: string) {
    const params = new HttpParams().set('search', searchValue);

    return this.http.get<SearchResult>(`${this.api}/deep_search`, { params });
  }
}
