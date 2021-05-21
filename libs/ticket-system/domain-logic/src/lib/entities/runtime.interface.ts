/**
 * Интерфейс, отображающий временные отметки
 */
export interface Runtime {
  /**
   * Дата создания
   */
  readonly created_at: string;

  /**
   * Дата последнего обновления
   */
  readonly updated_at: string;

  /**
   * Дедлайн
   */
  readonly finished_at_plan: string;

  /**
   * Время закрытия
   */
  readonly finished_at: string;
}
