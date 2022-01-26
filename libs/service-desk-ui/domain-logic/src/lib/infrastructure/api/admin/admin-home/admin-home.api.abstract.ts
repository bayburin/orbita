import { Observable } from 'rxjs';

import { AdminHome } from '../../../../entities/server-data/admin-home.interface';

export abstract class AdminHomeApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Отправляет запрос для получения данных для домашней страницы администрирования
   */
  abstract loadHomeData(): Observable<AdminHome>;
}
