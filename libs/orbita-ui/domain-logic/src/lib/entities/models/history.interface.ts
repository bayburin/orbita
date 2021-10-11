/**
 * Интерфейс событий, происходящих в заявке (история заявки)
 */
export interface History {
  /**
   * Идентификатор истории
   */
  readonly id: number;

  /**
   * Идентификатор работы по заявке
   */
  readonly work_id: number;

  /**
   * Идентификатор пользователя, совершившего действие
   */
  readonly user_id: number;

  /**
   * Идентификатор вида действия
   */
  readonly event_type_id: number;

  /**
   * Текстовое описание произошедшего события
   */
  readonly action: string;

  /**
   * Время события
   */
  readonly created_at: string;
}
