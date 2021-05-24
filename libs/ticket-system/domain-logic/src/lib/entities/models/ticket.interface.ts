/**
 * Интерфейс заявки
 */
export interface Ticket {
  /**
   * ID (номер) заявки.
   */
  readonly id: number;

  /**
   * Тип тикета: заявка или кейс
   */
  readonly type: TicketTypes;

  /**
   * Описание
   */
  readonly description: string;

  /**
   * Статус
   */
  readonly status: Statuses;

  /**
   * Приоритет
   */
  readonly priority: Priorities;

  /**
   * Объект Runtime
   */
  readonly runtime: Runtime;

  /**
   * Массив идентификаторов объектов Message
   */
  readonly comments: string[];
}

/**
 * Типы тикета
 */
export type TicketTypes = 'SdRequest' | 'Case';

/**
 * Статусы тикета
 */
export enum Statuses {
  OPENED = 'opened',
  AT_WORK = 'at_work',
  CANCELED = 'canceled',
  DONE = 'done'
}

/**
 * Приоритеты тикета
 */
export enum Priorities {
  DEFAULT = 'default',
  LOW = 'low',
  HIGH = 'high'
}

/**
 * Интерфейс, отображающий временные отметки тикета
 */
export interface Runtime {
  /**
   * Дата создания
   */
  readonly created_at: string;

  /**
   * Дата последнего обновления
   */
  readonly updated_at: string;

  /**
   * Дедлайн
   */
  readonly finished_at_plan: string;

  /**
   * Время закрытия
   */
  readonly finished_at: string;
}
