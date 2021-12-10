import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EventTypes, EventTypesVM, getViewModelEventType, Notification } from '@orbita/service-desk-ui/domain-logic';
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

  eventTypeVM(eventType: EventTypes): EventTypesVM {
    return getViewModelEventType(eventType);
  }
}
