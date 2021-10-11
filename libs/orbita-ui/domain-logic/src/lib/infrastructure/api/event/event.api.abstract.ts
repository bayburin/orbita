import { Observable } from 'rxjs';

import { DefaultServerResponse } from './../../../entities/server-data/default-server-response.interface';
import { Event } from './../../../entities/models/event.interface';

/**
 * Содержит API параметров заявок для обращения к серверу
 */
export abstract class EventApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Отправляет указанное событие на сервер
   *
   * @param event - событие
   */
  abstract create(event: Event): Observable<DefaultServerResponse>;
}
