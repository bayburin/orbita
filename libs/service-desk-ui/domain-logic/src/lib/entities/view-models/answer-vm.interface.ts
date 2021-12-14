import { AnswerAttachment } from '../model/answer-attachment.interface';
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
  readonly attachments: AnswerAttachment[];

  /**
   * Ссылка
   */
  readonly link: string;
}
