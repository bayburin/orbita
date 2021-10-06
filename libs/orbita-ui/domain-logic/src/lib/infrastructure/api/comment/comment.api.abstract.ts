import { Observable } from 'rxjs';

import { DefaultServerResponse } from './../../../entities/server-data/default-server-response.interface';

export abstract class CommentApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Создает заявку
   *
   * @param ticketId - номер тикета
   * @param message - новый комментарий
   */
  abstract create(ticketId: number, message: string): Observable<DefaultServerResponse>;
}
