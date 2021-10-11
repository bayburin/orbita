import { Observable } from 'rxjs';

import { InitServerData } from './../../../entities/server-data/init.interface';

/**
 * Содержит API для обращения к серверу орбиты в случаях, когда они не связаны с какими-то конкретными сущностями
 */
export abstract class AppApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера данные, необходимые для инициализации приложения
   */
  abstract init(): Observable<InitServerData>;
}
