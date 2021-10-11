/**
 * Интерфейс "работы" по заявке. Под работой подразумевается группа Group, подключенная к заявке и решающая задачи в рамках своего подразделения.
 */
export interface Work {
  /**
   * Идентификатор работы
   */
  readonly id: number;

  /**
   * Идентификатор заявки
   */
  readonly claim_id: number;

  /**
   * Идентификатор группы
   */
  readonly group_id: number;

  /**
   * Массив произошедших событий
   */
  readonly histories: number[];

  /**
   * Массив исполнителей
   */
  readonly workers: number[];

  /**
   * Массив сообщений о ходе работы по заявке
   */
  readonly workflows: number[];
}
