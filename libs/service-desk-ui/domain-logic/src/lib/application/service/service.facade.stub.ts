import { BehaviorSubject } from 'rxjs';

import { ServiceFacadeAbstract } from './service.facade.abstract';

export class ServiceFacadeStub implements ServiceFacadeAbstract {
  all$ = new BehaviorSubject([]);
}
