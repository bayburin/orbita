import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserFacadeAbstract } from './user.facade.abstract';
import * as NotificationFeature from '../../infrastructure/store/notification/notification.reducer';
import * as NotificationSelectors from '../../infrastructure/store/notification/notification.selectors';
import * as NotificationActions from '../../infrastructure/store/notification/notification.actions';

/**
 * Фасад для работы с категориями
 */
@Injectable({
  providedIn: 'root',
})
export class UserFacade implements UserFacadeAbstract {
  notifications$ = this.notificationStore.select(NotificationSelectors.getAll);
  notificationsLoading$ = this.notificationStore.select(NotificationSelectors.getLoading);
  notificationsLoaded$ = this.notificationStore.select(NotificationSelectors.getLoaded);

  constructor(private notificationStore: Store<NotificationFeature.NotificationPartialState>) {}

  loadAllNotifications() {
    this.notificationStore.dispatch(NotificationActions.loadAll());
  }

  toggleNotificationVisibleLimit() {
    this.notificationStore.dispatch(NotificationActions.toggleVisibleLimit());
  }
}
