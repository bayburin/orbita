import { Observable } from 'rxjs';

import { UserQueue } from './../../../entities/user-queue.interface';

/**
 * Содержит API пользователей для обращения к серверу
 */
export abstract class UserApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список пользователей
   */
  abstract query(): Observable<UserQueue>;
}
