import { BehaviorSubject } from 'rxjs';

import { KaseFacadeAbstract } from './kase.facade.abstract';

export class KaseFacadeStub implements KaseFacadeAbstract {
  all$ = new BehaviorSubject([]);
  initLoading$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  statuses$ = new BehaviorSubject([]);

  init() {
    /** */
  }

  loadAll() {
    /** */
  }

  revoke() {
    /** */
  }
}
