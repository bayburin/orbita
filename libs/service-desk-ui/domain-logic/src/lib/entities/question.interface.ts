/**
 * Вопрос
 */
export interface Question {
  /**
   * Идентификатор вопроса
   */
  readonly id: number;

  /**
   * Идентификатор оригинала (в случае, если это черновой вариант)
   */
  readonly original_id: number;

  /**
   * Тикет
   */
  readonly ticket: number;

  /**
   * Черновой вариант вопроса
   */
  readonly correction?: number;

  /**
   * Список ответов
   */
  readonly answers: number[];
}
