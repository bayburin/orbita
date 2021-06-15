import { BehaviorSubject } from 'rxjs';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';

export class SdRequestFacadeStub implements SdRequestFacadeAbstract {
  selected$ = new BehaviorSubject(null);
  firstRowIndex$ = new BehaviorSubject(0);
  totalCount$ = new BehaviorSubject(0);
  perPage$ = new BehaviorSubject(0);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  loadSdRequests$ = new BehaviorSubject(null);
  all$ = new BehaviorSubject([]);

  setTableMetadata() {
    /** */
  }
}
