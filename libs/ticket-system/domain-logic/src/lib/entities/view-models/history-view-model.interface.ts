import { EventType } from '../models/event-type.interface';
import { User } from '../models/user.interface';

/**
 * Интерфейс событий, происходящих в заявке (история заявки)
 */
export interface HistoryViewModel {
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
   * Пользователь, совершивший действие
   */
  readonly user: User;

  /**
   * Идентификатор вида действия
   */
  readonly event_type_id: number;

  /**
   * Объект EventType
   */
  readonly event_type: EventType;

  /**
   * Текстовое описание произошедшего события
   */
  readonly action: string;

  /**
   * Время события
   */
  readonly created_at: string;

  /**
   * Флаг, определяющий, является ли событие (история) последним в заявке
   */
  readonly _isLast: boolean;
}
