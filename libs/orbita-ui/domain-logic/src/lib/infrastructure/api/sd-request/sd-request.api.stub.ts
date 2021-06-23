import { of, Observable } from 'rxjs';

import {
  SdRequestsServerData,
  SdRequestServerData,
} from './../../../entities/server-data/sd-request-server-data.interface';
import { SdRequestsServerDataBuilder } from './../../builders/sd-request-server-data.builder';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

export class SdRequestApiStub implements SdRequestApiAbstract {
  api = '';

  query(): Observable<SdRequestsServerData> {
    return of(new SdRequestsServerDataBuilder().build());
  }

  show(): Observable<SdRequestServerData> {
    return of({ sd_request: null });
  }
}
