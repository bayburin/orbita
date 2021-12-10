import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';

import { getLimitTypesVM, LimitTypes, LimitTypesVM, Notification } from '@orbita/service-desk-ui/domain-logic';
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
   * Индикатор, загружены ли все уведомления
   */
  @Input() loadedAllNotifications: boolean;
  /**
   * Индикатор загрузки новых уведомлений
   */
  @Input() loadingNewNotifications: boolean;
  /**
   * HTML элемент, вызвавший текущий компонент
   */
  @Input() calledElement: HTMLElement;
  /**
   * Число непрочитанных уведомлений
   */
  @Input() unreadNotificationCount: number;
  /**
   * Тип ограничения списка уведомлений
   */
  @Input() limitType: LimitTypes;
  /**
   * Событие "клика" вне текущего элемента для закрытия окна
   */
  @Output() clickedOutside = new EventEmitter<void>();
  /**
   * Событие загрузки всех уведомлений
   */
  @Output() loadNewNotification = new EventEmitter<void>();
  /**
   * Событие изменения максимального числа показываемых уведомлений
   */
  @Output() toggleNotificationLimit = new EventEmitter<void>();
  activeTab = 1;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target']) onClickOutside(target: any) {
    // FIXME: Не работает с кнопкой "Смотреть остальные уведомления"
    // if (!this.elementRef.nativeElement.contains(target) && !this.calledElement.contains(target)) {
    //   this.clickedOutside.emit();
    // }
  }

  eventTypeVM(limitType: LimitTypes): LimitTypesVM {
    return getLimitTypesVM(limitType);
  }
}
