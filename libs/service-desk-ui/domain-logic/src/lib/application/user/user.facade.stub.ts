import { BehaviorSubject } from 'rxjs';

import { UserFacadeAbstract } from './user.facade.abstract';

export class UserFacadeStub implements UserFacadeAbstract {
  notifications$ = new BehaviorSubject([]);
  notificationsLoading$ = new BehaviorSubject(false);
  notificationsLoaded$ = new BehaviorSubject(false);

  loadAllNotifications() {
    /** */
  }
}
