import { Priorities } from './../models/ticket.interface';
import { SourceSnapshotForm } from './source-snapshot-form.interface';

/**
 * Форма тикета
 */
export interface TicketForm {
  /**
   * ID (номер) заявки.
   */
  id?: number;

  /**
   * Данные на момент создания заявки/кейса
   */
  source_snapshot?: SourceSnapshotForm;

  /**
   * Описание
   */
  description?: string;

  /**
   * Приоритет
   */
  priority: Priorities;

  /**
   * Дедлайн
   */
  finished_at_plan: string | Date;
}

/**
 * Типы тикета
 */
export type TicketTypes = 'SdRequest' | 'Case';
