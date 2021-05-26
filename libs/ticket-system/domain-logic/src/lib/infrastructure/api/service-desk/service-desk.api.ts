import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { ServiceDeskApiAbstract } from './service-desk.api.abstract';
import { FreeSdRequestType } from '../../../entities/models/sd/free-sd-request-type.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceDeskApi implements ServiceDeskApiAbstract {
  readonly api = `${this.env.serviceDeskApi}/v2`;

  constructor(
    private http: HttpClient,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment
  ) { }

  getFreeSdRequestTypes() {
    return this.http.get<FreeSdRequestType[]>(`${this.api}/services`);
  }
}
