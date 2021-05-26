import { of, Observable } from 'rxjs';

import { SdRequestServerData } from './../../../entities/server-data/sd-request-server-data.interface';
import { SdRequestQueueBuilder } from './../../builders/sd-request-queue.builder';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

export class SdRequestApiStub implements SdRequestApiAbstract {
  api = '';

  query(): Observable<SdRequestServerData> { return of(new SdRequestQueueBuilder().build()); }
}
