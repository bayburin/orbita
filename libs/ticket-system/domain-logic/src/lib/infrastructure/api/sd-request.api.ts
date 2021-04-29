import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ORBITA_UI_ENV_TOKEN, IOrbitaUiEnvironment } from '@orbita/shared/environment';

import { SdRequest } from './../../entities/sd-request.interface';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

@Injectable()
export class SdRequestApi implements SdRequestApiAbstract {
  // TODO: Подставить environment (запросы на sd_requests)
  readonly api = `${this.env.serverApiUrl}/claims`;

  constructor(
    private http: HttpClient,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: IOrbitaUiEnvironment
  ) { }

  getSdRequests(): Observable<SdRequest[]> {
    return this.http.get<SdRequest[]>(this.api);
  }
}
