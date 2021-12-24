import { Hideable } from '../models/hideable.interface';
import { ResponsibleUser } from '../models/responsible-user.interface';
import { TicketStates, TicketTypes } from '../models/ticket.interface';

/**
 * Представление тикета
 */
export interface TicketVM extends Hideable {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Постоянный идентификатор
   */
  readonly identity: number;

  /**
   * Идентификатор услуги
   */
  readonly service_id: number;

  /**
   * Наименование
   */
  readonly name: string;

  /**
   * Идентификатор привязанной сущности
   */
  readonly ticketable_id: number;

  /**
   * Наименование сущности
   */
  readonly ticketable_type: TicketTypes;

  /**
   * Состояния
   */
  readonly state: TicketStates;

  /**
   * SLA
   */
  readonly sla: number;

  /**
   * Рейтинг
   */
  readonly popularity: number;

  /**
   * Список тегов
   */
  readonly tags: number[];

  /**
   * Список ответственных
   */
  readonly responsible_users: ResponsibleUser[];
}
