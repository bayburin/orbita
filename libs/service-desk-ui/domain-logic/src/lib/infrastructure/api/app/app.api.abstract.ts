import { Observable } from 'rxjs';

import { AppVersion } from './../../../entities/server-data/app-version.interface';

/**
 * Содержит API для обращения к серверу орбиты в случаях, когда они не связаны с какими-то конкретными сущностями
 */
export abstract class AppApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает версию и хэш приложения
   */
  abstract appVersion(): Observable<AppVersion>;
}
