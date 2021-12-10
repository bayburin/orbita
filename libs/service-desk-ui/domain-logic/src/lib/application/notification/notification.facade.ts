import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TmpNotification, Notification } from '@orbita/service-desk-ui/domain-logic';
import { NotificationFacadeAbstract } from './notification.facade.abstract';
import * as NotificationFeature from '../../infrastructure/store/notification/notification.reducer';
import * as NotificationSelectors from '../../infrastructure/store/notification/notification.selectors';
import * as NotificationActions from '../../infrastructure/store/notification/notification.actions';
import { StreamService } from '../../infrastructure/stream/stream.service';
import { TmpNotificationFactory } from '../../infrastructure/factories/tmp-notification.factory';

/**
 * Фасад для работы с категориями
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationFacade implements NotificationFacadeAbstract {
  notifications$ = this.store.select(NotificationSelectors.getAllLimited);
  loading$ = this.store.select(NotificationSelectors.getLoading);
  loadingNew$ = this.store.select(NotificationSelectors.getLoading);
  loaded$ = this.store.select(NotificationSelectors.getLoaded);
  tmpNotifications$ = this.store.select(NotificationSelectors.getTmpNotifications);
  unreadNotificationCount$ = this.store.select(NotificationSelectors.getUnreadNotificationCount);
  limitType$ = this.store.select(NotificationSelectors.getLimitType);

  constructor(
    private streamService: StreamService,
    private store: Store<NotificationFeature.NotificationPartialState>
  ) {}

  loadAllNotifications() {
    this.store.dispatch(NotificationActions.loadAll());
  }

  loadNewNotifications() {
    this.store.dispatch(NotificationActions.loadNew());
  }

  toggleNotificationLimitType() {
    this.store.dispatch(NotificationActions.toggleLimitType());
  }

  removeTmpNotification(notification: TmpNotification) {
    this.store.dispatch(NotificationActions.removeTmpNotification({ notification }));
  }

  connectToNotificationCountChannel(): Subscription {
    const channel = this.streamService.cable.channel('UserNotificationCountChannel');

    channel.connected().subscribe(() => channel.perform('get'));
    return channel.received().subscribe((count) => {
      this.store.dispatch(NotificationActions.setUnreadNotificationCount({ count }));
    });
  }

  connectToUserNotifications(): Subscription {
    const channel = this.streamService.cable.channel('UserNotifyChannel');

    return channel.received().subscribe((notification: Notification) => {
      const tmpNotification = TmpNotificationFactory.createFromNotification(notification);

      this.store.dispatch(NotificationActions.increaseUnreadNotificationCount());
      this.store.dispatch(NotificationActions.addTmpNotification({ notification: tmpNotification }));
    });
  }
}
