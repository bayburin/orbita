import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import {
  NotificationTypes,
  NotificationTypesVM,
  getViewModelNotificationType,
  TmpNotification,
} from '@orbita/service-desk-ui/domain-logic';
import { notifyAnimation } from './../../animations/notify.animation';

@Component({
  selector: 'lib-notification-alert-list',
  templateUrl: './notification-alert-list.component.html',
  styleUrls: ['./notification-alert-list.component.scss'],
  animations: [notifyAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationAlertListComponent {
  /**
   * Список уведомлений
   */
  @Input() notifications: TmpNotification[];
  /**
   * Событие закрытия уведомления
   */
  @Output() closeNotification = new EventEmitter<TmpNotification>();

  notificationTypeVM(notificationType: NotificationTypes): NotificationTypesVM {
    return getViewModelNotificationType(notificationType);
  }
}
