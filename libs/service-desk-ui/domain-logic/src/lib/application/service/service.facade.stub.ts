import { BehaviorSubject } from 'rxjs';

import { ServiceFacadeAbstract } from './service.facade.abstract';

export class ServiceFacadeStub implements ServiceFacadeAbstract {
  entity$ = new BehaviorSubject(null);
  selected$ = new BehaviorSubject(null);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);

  loadSelected() {
    /** */
  }
}
