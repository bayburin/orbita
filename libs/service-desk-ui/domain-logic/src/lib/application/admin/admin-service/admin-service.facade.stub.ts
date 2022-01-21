import { BehaviorSubject } from 'rxjs';

import { AdminServiceFacadeAbstract } from './admin-service.facade.abstract';

export class AdminServiceFacadeStub implements AdminServiceFacadeAbstract {
  all$ = new BehaviorSubject([]);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);

  loadAll() {
    /** */
  }
}
