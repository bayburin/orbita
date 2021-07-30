import { SdTicketTypes } from './../models/sd/sd-ticket.interface';
import { SdService } from './../models/sd/sd-service.interface';
import { User } from './../models/user.interface';
/**
 * Интерфейс типа заявки в свободной форме
 */
export interface SdTicketViewModel {
  /**
   * Идентификатор вида заявки
   */
  readonly id: number;
  /**
   * Неизменяемый идентификатор вида заявки
   */
  readonly identity: number;

  /**
   * Идентификатор услуги
   */
  readonly service_id: number;

  /**
   * Вид услуги
   */
  readonly service: SdService;

  /**
   * Имя вида заявки
   */
  readonly name: string;

  /**
   * SLA
   */
  readonly sla: number;

  /**
   * Идентификатор связанной записи типа тикета
   */
  readonly ticketable_id: number;

  /**
   * Тип тикета
   */
  readonly ticketable_type: SdTicketTypes;

  /**
   * Список табельных номеров ответственных исполнителей
   */
  readonly responsible_users: User[];
}
