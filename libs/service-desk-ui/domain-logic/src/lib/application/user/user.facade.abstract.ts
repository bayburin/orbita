import { Observable } from 'rxjs';

import { Notification } from '../../entities/model/notification.interface';

export abstract class UserFacadeAbstract {
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
   * Загружает список всех уведомлений
   */
  abstract loadAllNotifications(): void;

  /**
   * Изменить максимальное число выводимых уведомлений
   */
  abstract toggleNotificationVisibleLimit(): void;
}
