import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SdRequest } from './../../entities/sd-request.interface';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

@Injectable({
  providedIn: 'root'
})
export class SdRequestApi implements SdRequestApiAbstract {
  readonly api = 'https://orbita-center-dev.iss-reshetnev.ru/api/v1/sd_requests'

  constructor(private http: HttpClient) { }

  getSdRequests(): Observable<SdRequest[]> {
    return this.http.get<SdRequest[]>(this.api);
  }
}
