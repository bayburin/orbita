import { BehaviorSubject } from 'rxjs';

import { NotificationFacadeAbstract } from './notification.facade.abstract';

export class NotificationFacadeStub implements NotificationFacadeAbstract {
  notifications$ = new BehaviorSubject([]);
  notificationsLoading$ = new BehaviorSubject(false);
  notificationsLoaded$ = new BehaviorSubject(false);
  tmpNotifications$ = new BehaviorSubject([]);

  loadAllNotifications() {
    /** */
  }

  toggleNotificationVisibleLimit() {
    /** */
  }

  removeTmpNotification() {
    /** */
  }
}
