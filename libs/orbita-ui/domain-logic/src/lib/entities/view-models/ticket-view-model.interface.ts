import { TicketTypes, Statuses, Priorities, Runtime } from './../models/ticket.interface';
import { SourceSnapshot } from './../models/source-snapshot.interface';
import { MessageViewModel } from './message-view-model.interface';
import { Attachment } from './../models/attachment.interface';
import { WorkViewModel } from './work-view-model.interface';

/**
 * Интерфейс заявки
 */
export interface TicketViewModel {
  /**
   * ID (номер) заявки.
   */
  readonly id: number;

  /**
   * Данные на момент создания заявки/кейса
   */
  readonly source_snapshot: SourceSnapshot;

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
   * Массив объектов Work
   */
  readonly works: WorkViewModel[];

  /**
   * Массив объектов Message
   */
  readonly comments: MessageViewModel[];

  /**
   * Массив объект Attachment
   */
  readonly attachments: Attachment[];
}
