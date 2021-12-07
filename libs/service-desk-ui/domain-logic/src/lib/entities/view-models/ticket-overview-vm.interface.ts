import { ResponsibleUser } from '../model/responsible-user.interface';
import { TicketStates, TicketTypes } from '../model/ticket.interface';
import { Service } from './../model/service.interface';

/**
 * Полное представление тикета
 */
export interface TicketOverviewVM {
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
   * Услуга
   */
  readonly service: Service;

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
   * Флаг, показывающий, скрытый ли тикет
   */
  readonly is_hidden: boolean;

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
