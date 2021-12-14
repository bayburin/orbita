import { Hideable } from './hideable.interface';

/**
 * Тикет
 */
export interface Ticket extends Hideable {
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
  readonly responsible_users: number[];
}

/**
 * Типы тикетов
 */
export const enum TicketTypes {
  QUESTION = 'Question',
  CLAIM_FORM = 'AppForm',
  COMMON_CLAIM = 'CommonCaseTicket',
}

/**
 * Состояния тикетов
 */
export const enum TicketStates {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}
