import { User } from '../models/user.interface';

/**
 * Интерфейс, связывающий работников с заявками
 */
export interface WorkerViewModel {
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

  /**
   * Исполнитель
   */
  user: User;
}
