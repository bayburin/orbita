import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { SdRequestQueue } from './../../../entities/sd-request-queue.interface';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

@Injectable({
  providedIn: 'root'
})
export class SdRequestApi implements SdRequestApiAbstract {
  readonly api = `${this.env.serverApiUrl}/sd_requests`;

  constructor(
    private http: HttpClient,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment
  ) { }

  query(page: number, perPage: number) {
    const params = new HttpParams()
      .append('page', `${page}`)
      .append('perPage', `${perPage}`);

    return this.http.get<SdRequestQueue>(this.api, { params });
  }
}
