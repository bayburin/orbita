import { Statuses } from './statuses.enum';
import { Priorities } from './priorities.enum';
import { Runtime } from './runtime.interface';
import { Message } from './message.interface';

/**
 * Типы тикета
 */
export type TicketTypes = 'SdRequest' | 'Case';

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
   * Массив объектов Message
   */
  readonly comments: Message[];
}
