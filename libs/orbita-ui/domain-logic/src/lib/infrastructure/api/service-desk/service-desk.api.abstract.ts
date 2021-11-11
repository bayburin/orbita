import { Observable } from 'rxjs';

import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

export abstract class ServiceDeskApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера техподдержки список возможных заявок.
   */
  abstract getTickets(): Observable<SdTicket[]>;

  /**
   * Получает с сервера техподдержки указанный вид заявки.
   *
   * @param ticketIdentity - идентификатор вида заявки
   */
  abstract getTicket(ticketIdentity: number): Observable<SdTicket>;
}
