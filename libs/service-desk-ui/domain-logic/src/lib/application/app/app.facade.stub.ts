import { BehaviorSubject } from 'rxjs';

import { AppFacadeAbstract } from './app.facade.abstract';

export class AppFacadeStub implements AppFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject(null);
  serverDate$ = new BehaviorSubject(null);

  init() {
    /** */
  }

  detectAdBlock() {
    /** */
  }

  initVersionChecking() {
    /** */
  }
}
