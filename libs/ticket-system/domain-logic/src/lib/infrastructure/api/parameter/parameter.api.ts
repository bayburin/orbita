import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { ParameterServerData } from './../../../entities/server-data/parameter-server-data.interface';
import { ParameterApiAbstract } from './parameter.api.abstract';

/**
 * Содержит API параметров заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root'
})
export class ParameterApi implements ParameterApiAbstract {
  readonly api = `${this.env.serverApiUrl}/parameters`;

  constructor(
    private http: HttpClient,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment
  ) { }

  query(claim_id: number) {
    const params = new HttpParams().append('claim_id', `${claim_id}`)

    return this.http.get<ParameterServerData>(this.api, { params });
  }
}
