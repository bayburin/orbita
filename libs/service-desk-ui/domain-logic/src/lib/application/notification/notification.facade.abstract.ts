import { Observable } from 'rxjs';

import { Notification, TmpNotification } from '../../entities/model/notification.interface';

export abstract class NotificationFacadeAbstract {
  /**
   * Список всех категорий
   */
  notifications$: Observable<Notification[]>;
  /**
   * Индикатор, идет ли загрузка уведомлений в данный момент
   */
  notificationsLoading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли уведомления
   */
  notificationsLoaded$: Observable<boolean>;
  /**
   * Список всплывающих сообщений
   */
  tmpNotifications$: Observable<TmpNotification[]>;

  /**
   * Загружает список всех уведомлений
   */
  abstract loadAllNotifications(): void;

  /**
   * Изменить максимальное число выводимых уведомлений
   */
  abstract toggleNotificationVisibleLimit(): void;

  /**
   * Удалить уведомление
   */
  abstract removeTmpNotification(notification: TmpNotification): void;
}
