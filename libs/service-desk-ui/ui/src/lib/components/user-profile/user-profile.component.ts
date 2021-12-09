import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { Notification } from '@orbita/service-desk-ui/domain-logic';
import { notifyAnimation } from './../../animations/notify.animation';

@Component({
  selector: 'lib-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [notifyAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  /**
   * Список уведомлений
   */
  @Input() notifications: Notification[];
  /**
   * Индикатор загрузки всех уведомлений
   */
  @Input() loadingAllNotifications: boolean;
  /**
   * Индикатор загрузки новых уведомлений
   */
  @Input() loadingNewNotifications: boolean;
  /**
   * Событие загрузки всех уведомлений
   */
  @Output() loadNewNotification = new EventEmitter<void>();
  /**
   * Событие изменения максимального числа показываемых уведомлений
   */
  @Output() toggleNotificationLimit = new EventEmitter<void>();
  activeTab = 1;
  arrowUp = false;
}
