import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  NotificationTypes,
  NotificationTypesVM,
  getViewModelNotificationType,
  Notification,
} from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from './../../animations/content.animation';
import { colorAnimation } from './../../animations/color.animation';

@Component({
  selector: 'lib-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  animations: [contentBlockAnimation, colorAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationListComponent {
  @Input() notifications: Notification[];

  trackByNotification(index: number, notification: Notification) {
    return notification.id;
  }

  notificationTypeVM(notificationType: NotificationTypes): NotificationTypesVM {
    return getViewModelNotificationType(notificationType);
  }
}
