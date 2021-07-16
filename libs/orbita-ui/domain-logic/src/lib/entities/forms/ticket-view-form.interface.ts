import { Priorities } from './../models/ticket.interface';
import { SourceSnapshotForm } from './source-snapshot-form.interface';
import { AttachmentForm } from './attachment-form.interface';

/**
 * Форма тикета
 */
export interface TicketViewForm {
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

  /**
   * Список прикрепленных файлов, которые уже сохранены на сервере
   */
  attachments: AttachmentForm[];

  /**
   * Список новых прикрепленных файлов
   */
  newAttachments: File[];
}

/**
 * Типы тикета
 */
export type TicketTypes = 'SdRequest' | 'Case';
