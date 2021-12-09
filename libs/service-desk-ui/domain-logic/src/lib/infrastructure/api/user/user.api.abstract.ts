import { Observable } from 'rxjs';

import { Notification } from '../../../entities/model/notification.interface';

export abstract class UserApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера все уведомления пользователя
   */
  abstract loadNotifications(): Observable<Notification[]>;

  /**
   * Получает с сервера все новые уведомления пользователя
   */
  abstract loadNewNotifications(): Observable<Notification[]>;
}
