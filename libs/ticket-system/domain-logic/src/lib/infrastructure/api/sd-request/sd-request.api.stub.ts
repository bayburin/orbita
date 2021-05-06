import { of, Observable } from 'rxjs';

import { SdRequestQueue } from './../../../entities/sd-request-queue.interface';

export class SdRequestApiStub {
  query(): Observable<SdRequestQueue> { return of({ sd_requests: [], meta: {} } as unknown as SdRequestQueue ); }
}
