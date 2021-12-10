import { BehaviorSubject, Subscription } from 'rxjs';

import { NotificationFacadeAbstract } from './notification.facade.abstract';

export class NotificationFacadeStub implements NotificationFacadeAbstract {
  notifications$ = new BehaviorSubject([]);
  loading$ = new BehaviorSubject(false);
  loadingNew$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  tmpNotifications$ = new BehaviorSubject([]);
  unreadNotificationCount$ = new BehaviorSubject(0);
  limitType$ = new BehaviorSubject(null);

  loadAllNotifications() {
    /** */
  }

  loadNewNotifications() {
    /** */
  }

  toggleNotificationLimitType() {
    /** */
  }

  removeTmpNotification() {
    /** */
  }

  connectToNotificationCountChannel() {
    return new Subscription();
  }

  connectToUserNotifications() {
    return new Subscription();
  }
}
