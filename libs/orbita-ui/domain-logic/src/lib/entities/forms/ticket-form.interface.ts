import { Priorities } from './../models/ticket.interface';
import { SourceSnapshotForm } from './source-snapshot-form.interface';

/**
 * Форма тикета
 */
export interface TicketForm {
  /**
   * ID (номер) заявки.
   */
  readonly id: number;

  /**
   * Данные на момент создания заявки/кейса
   */
  readonly source_snapshot?: SourceSnapshotForm;

  /**
   * Описание
   */
  readonly description: string;

  /**
   * Приоритет
   */
  readonly priority: Priorities;

  /**
   * Дедлайн
   */
  readonly finished_at_plan: string;
}

/**
 * Типы тикета
 */
export type TicketTypes = 'SdRequest' | 'Case';
