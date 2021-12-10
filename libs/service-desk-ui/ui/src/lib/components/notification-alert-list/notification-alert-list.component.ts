import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { EventTypes, EventTypesVM, getViewModelEventType, TmpNotification } from '@orbita/service-desk-ui/domain-logic';
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

  eventTypeVM(eventType: EventTypes): EventTypesVM {
    return getViewModelEventType(eventType);
  }
}
