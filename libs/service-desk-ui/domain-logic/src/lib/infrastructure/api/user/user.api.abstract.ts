import { Observable } from 'rxjs';

import { Notification } from '../../../entities/models/notification.interface';
import { UserOwns } from '../../../entities/server-data/user-owns.interface';

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

  /**
   * Получить списки объектов, с которыми может работать пользователь для создания заявок (список техники, список услуг и т.п.).
   */
  abstract loadUserOwns(): Observable<UserOwns>;
}
