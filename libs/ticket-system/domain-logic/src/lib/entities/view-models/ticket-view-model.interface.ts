import { TicketTypes, Statuses, Priorities, Runtime } from './../models/ticket.interface';
import { MessageViewModel } from './message-view-model.interface';

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
  readonly comments: MessageViewModel[];
}
