import { User } from '../models/user.interface';

/**
 * Интерфейс, связывающий работников с заявками
 */
export interface WorkerViewModel {
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

  /**
   * Исполнитель
   */
  readonly user: User;
}
