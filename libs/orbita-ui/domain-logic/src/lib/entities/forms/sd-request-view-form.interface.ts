import { Priorities } from './../models/ticket.interface';
import { AttachmentViewForm } from './attachment-view-form.interface';

/**
 * Форма существующей заявки, которую заполняет пользователь
 */
export interface SdRequestViewForm {
  /**
   * Идентификатор заявки
   */
  id?: number;

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
  attachments?: AttachmentViewForm[];

  /**
   * Список новых прикрепленных файлов
   */
  newAttachments: File[];

  /**
   * Список идентификаторов исполнителей
   */
  workers: number[];

  /**
   * Сообщение вида "ход работы"
   */
  workflow?: string;
}
