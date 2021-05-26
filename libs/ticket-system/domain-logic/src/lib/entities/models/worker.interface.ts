/**
 * Интерфейс исполнителя заявки
 */
export interface Worker {
  /**
   * Идентификатор связки
   */
  id: number;

  /**
   * Идентификатор пользователя
   */
  user_id: number;

  /**
   * Идентификатор работы
   */
  work_id: number;
}
