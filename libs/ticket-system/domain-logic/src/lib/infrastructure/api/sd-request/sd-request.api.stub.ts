import { of, Observable } from 'rxjs';

import { SdRequestQueue } from './../../../entities/sd-request-queue.interface';
import { SdRequestQueueBuilder } from './../../builders/sd-request-queue.builder';

export class SdRequestApiStub {
  query(): Observable<SdRequestQueue> { return of(new SdRequestQueueBuilder().build()); }
}
