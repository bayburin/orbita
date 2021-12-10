import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TmpNotification } from '@orbita/service-desk-ui/domain-logic';
import { NotificationFacadeAbstract } from './notification.facade.abstract';
import * as NotificationFeature from '../../infrastructure/store/notification/notification.reducer';
import * as NotificationSelectors from '../../infrastructure/store/notification/notification.selectors';
import * as NotificationActions from '../../infrastructure/store/notification/notification.actions';

/**
 * Фасад для работы с категориями
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationFacade implements NotificationFacadeAbstract {
  notifications$ = this.store.select(NotificationSelectors.getAll);
  notificationsLoading$ = this.store.select(NotificationSelectors.getLoading);
  notificationsLoaded$ = this.store.select(NotificationSelectors.getLoaded);
  tmpNotifications$ = this.store.select(NotificationSelectors.getTmpNotifications);

  constructor(private store: Store<NotificationFeature.NotificationPartialState>) {}

  loadAllNotifications() {
    this.store.dispatch(NotificationActions.loadAll());
  }

  toggleNotificationVisibleLimit() {
    this.store.dispatch(NotificationActions.toggleVisibleLimit());
  }

  removeTmpNotification(notification: TmpNotification) {
    this.store.dispatch(NotificationActions.removeTmpNotification({ notification }));
  }
}
