import { Hideable } from './hideable.interface';

/**
 * Вопрос
 */
export interface Answer extends Hideable {
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
  readonly attachments: number[];

  /**
   * Ссылка
   */
  readonly link: string;
}
