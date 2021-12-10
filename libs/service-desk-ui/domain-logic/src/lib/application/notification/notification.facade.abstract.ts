import { Observable, Subscription } from 'rxjs';

import { LimitTypes } from './../../entities/model/notification.interface';
import { Notification, TmpNotification } from '../../entities/model/notification.interface';

export abstract class NotificationFacadeAbstract {
  /**
   * Список всех уведомлений
   */
  notifications$: Observable<Notification[]>;
  /**
   * Индикатор, идет ли загрузка уведомлений в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, идет ли загрузка непрочитанных уведомлений в данный момент
   */
  loadingNew$: Observable<boolean>;
  /**
   * Индикатор, загружены ли уведомления
   */
  loaded$: Observable<boolean>;
  /**
   * Список всплывающих сообщений
   */
  tmpNotifications$: Observable<TmpNotification[]>;
  /**
   * Список непрочитанных сообщений
   */
  unreadNotificationCount$: Observable<number>;
  /**
   * Тип ограничения списка уведомлений
   */
  limitType$: Observable<LimitTypes>;

  /**
   * Загружает список всех уведомлений
   */
  abstract loadAllNotifications(): void;

  /**
   * Загружает список новых уведомлений
   */
  abstract loadNewNotifications(): void;

  /**
   * Изменить максимальное число выводимых уведомлений
   */
  abstract toggleNotificationLimitType(): void;

  /**
   * Удалить уведомление
   */
  abstract removeTmpNotification(notification: TmpNotification): void;

  /**
   * Подключается к каналу 'UserNotificationCountChannel'
   */
  abstract connectToNotificationCountChannel(): Subscription;

  /**
   * Подключается к каналу 'UserNotifyChannel'
   */
  abstract connectToUserNotifications(): Subscription;
}
