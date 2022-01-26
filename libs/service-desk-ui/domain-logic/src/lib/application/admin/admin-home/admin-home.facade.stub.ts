import { BehaviorSubject } from 'rxjs';

import { AdminHomeFacadeAbstract } from './admin-home.facade.abstract';

export class AdminHomeFacadeStub implements AdminHomeFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);

  init() {
    /** */
  }
}
