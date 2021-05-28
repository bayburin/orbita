import { of, Observable } from 'rxjs';

import { SdRequestServerData } from './../../../entities/server-data/sd-request-server-data.interface';
import { SdRequestServerDataBuilder } from './../../builders/sd-request-server-data.builder';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

export class SdRequestApiStub implements SdRequestApiAbstract {
  api = '';

  query(): Observable<SdRequestServerData> { return of(new SdRequestServerDataBuilder().build()); }
}
