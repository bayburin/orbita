import { BehaviorSubject } from 'rxjs';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';

export class SdRequestFacadeStub implements SdRequestFacadeAbstract {
  selected$ = new BehaviorSubject(null);
  page$ = new BehaviorSubject(0);
  totalCount$ = new BehaviorSubject(0);
  maxSize$ = new BehaviorSubject(0);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  loadSdRequests$ = new BehaviorSubject(null);
  all$ = new BehaviorSubject([]);

  setPage() {
    /** */
  }
}
