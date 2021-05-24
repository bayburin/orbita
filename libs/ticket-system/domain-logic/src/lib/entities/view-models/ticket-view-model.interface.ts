import { TicketTypes, Statuses, Priorities, Runtime } from './../models/ticket.interface';
import { Message } from '../models/message.interface';

/**
 * Интерфейс заявки
 */
export interface TicketViewModel {
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
