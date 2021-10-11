/**
 * Интерфейс исполнителя заявки
 */
export interface Worker {
  /**
   * Идентификатор связки
   */
  readonly id: number;

  /**
   * Идентификатор пользователя
   */
  readonly user_id: number;

  /**
   * Идентификатор работы
   */
  readonly work_id: number;
}
