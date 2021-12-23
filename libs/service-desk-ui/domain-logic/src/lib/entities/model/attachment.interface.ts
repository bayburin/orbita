/**
 * Прикрепленные к вопросу файлы
 */
export interface Attachment {
  /**
   * Идентификатор файла
   */
  readonly id: number;

  /**
   * Идентификатор вопроса
   */
  readonly answer_id: number;

  /**
   * Имя файла
   */
  readonly filename: string;
}
