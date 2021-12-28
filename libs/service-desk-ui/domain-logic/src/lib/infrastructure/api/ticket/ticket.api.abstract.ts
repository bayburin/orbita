import { Observable } from 'rxjs';

import { Ticket } from '../../../entities/models/ticket.interface';

export abstract class TicketApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Загружает тикет
   *
   * @param identity - идентификатор тикета
   */
  abstract show(identity: number): Observable<Ticket>;
}
