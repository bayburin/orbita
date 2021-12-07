/**
 * Вопрос
 */
export interface Answer {
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

  /**
   * Флаг, показывающий, скрыт ли вопрос
   */
  readonly is_hidden: boolean;
}
