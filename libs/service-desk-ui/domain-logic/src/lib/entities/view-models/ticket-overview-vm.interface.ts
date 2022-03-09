import { ResponsibleUser } from '../models/responsible-user.interface';
import { TicketStates, TicketTypes } from '../models/ticket.interface';
import { TicketOverviewServiceVM } from './ticket-overview-service-vm.interface';
import { Hideable } from '../models/hideable.interface';
import { Tag } from '../models/tag.interface';

/**
 * Полное представление тикета
 */
export interface TicketOverviewVM extends Hideable {
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
  readonly service: TicketOverviewServiceVM;

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
  readonly tags: Tag[];

  /**
   * Список ответственных
   */
  readonly responsible_users: ResponsibleUser[];
}
