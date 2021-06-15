import { BehaviorSubject } from 'rxjs';

import { UserFacadeAbstract } from './user.facade.abstract';

export class UserFacadeStub implements UserFacadeAbstract {
  loaded$ = new BehaviorSubject(false);
  all$ = new BehaviorSubject([]);
  userGroups$ = new BehaviorSubject([]);

  init() {
    /** */
  }
}
