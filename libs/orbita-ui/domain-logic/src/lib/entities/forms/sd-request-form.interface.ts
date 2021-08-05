import { Priorities } from './../models/ticket.interface';
import { SourceSnapshotForm } from './source-snapshot-form.interface';
import { AttachmentForm } from './attachment-form.interface';
import { WorkForm } from './work-form.interface';

/**
 * Форма заявки, которую обрабатывает сервер
 */
export interface SdRequestForm {
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
  priority?: Priorities;

  /**
   * Дедлайн
   */
  finished_at_plan?: string;

  /**
   * Список прикрепленных файлов, которые уже сохранены на сервере
   */
  attachments?: AttachmentForm[];

  /**
   * ID Услуги
   */
  service_id?: number;

  /**
   * Имя услуги
   */
  service_name?: string;

  /**
   * ID вида заявки
   */
  ticket_identity?: number;

  /**
   * Имя вида заявки
   */
  ticket_name?: string;

  /**
   * Оценка качества обслуживания
   */
  rating?: number;

  /**
   * Массив работ
   */
  works: WorkForm[];
}
