import { Attachment } from '../model/attachment.interface';
import { Hideable } from '../model/hideable.interface';

/**
 * Представление вопроса
 */
export interface AnswerVM extends Hideable {
  /**
   * Идентификатор ответа
   */
  readonly id: number;

  /**
   * Идентификатор вопроса
   */
  readonly question_id: number;

  /**
   * Ответ
   */
  readonly answer: string;

  /**
   * Список идентификаторов прикрепленных файлов
   */
  readonly attachments: Attachment[];

  /**
   * Ссылка
   */
  readonly link: string;
}
