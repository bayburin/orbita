import { of } from 'rxjs';

import { SdRequestsServerDataBuilder } from './../../builders/sd-request-server-data.builder';
import { SdRequestApiAbstract } from './sd-request.api.abstract';

export class SdRequestApiStub implements SdRequestApiAbstract {
  api = '';

  query() {
    return of(new SdRequestsServerDataBuilder().build());
  }

  show() {
    return of({ sd_request: null });
  }

  update() {
    return of({ sd_request: null });
  }
}
