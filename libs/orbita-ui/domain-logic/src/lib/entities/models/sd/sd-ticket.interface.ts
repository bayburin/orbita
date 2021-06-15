/**
 * Интерфейс типа заявки в свободной форме
 */
export interface SdTicket {
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
  readonly responsible_users: number[];
}

/**
 * Типы тикета на портале техподдержки
 */
export type SdTicketTypes = 'FreeApplication' | 'AppForm' | null;

/**
 * Состояния тикета: черновое или публичное
 */
export type States = 'draft' | 'published';
