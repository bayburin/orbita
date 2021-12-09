import { Observable } from 'rxjs';

import { Notification } from '../../../entities/model/notification.interface';

export abstract class UserApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера уведомления пользователя
   *
   * @param limit - запрашиваемое число уведомлений
   */
  abstract loadNotifications(limit: number): Observable<Notification[]>;

  /**
   * Получает с сервера новые уведомления пользователя
   *
   * @param limit - запрашиваемое число уведомлений
   */
  abstract loadNewNotifications(limit: number): Observable<Notification[]>;
}
