import { of, Observable } from 'rxjs';

import { SdRequest } from './../../entities/sd-request.interface';

export class SdRequestApiStub {
  getSdRequests(): Observable<SdRequest[]> { return of([]); }
}
