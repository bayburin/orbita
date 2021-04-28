import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SdRequest } from './../../entities/sd-request.interface';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

@Injectable()
export class SdRequestApi implements SdRequestApiAbstract {
  // TODO: Подставить environment (запросы на sd_requests)
  readonly api = 'https://orbita-center-test.iss-reshetnev.ru/api/v1/claims'

  constructor(private http: HttpClient) { }

  getSdRequests(): Observable<SdRequest[]> {
    return this.http.get<SdRequest[]>(this.api);
  }
}
