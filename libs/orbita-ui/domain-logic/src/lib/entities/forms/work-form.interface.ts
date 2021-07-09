import { WorkerForm } from './worker-form.interface';
import { MessageForm } from './message-form.interface';

/**
 * Форма работы по тикету
 */
export interface WorkForm {
  /**
   * Идентификатор работы
   */
  id?: number;

  /**
   * Идентификатор заявки
   */
  claim_id?: number;

  /**
   * Идентификатор группы
   */
  group_id: number;

  /**
   * Массив исполнителей
   */
  workers: WorkerForm[];

  /**
   * Массив сообщений и ходе работы
   */
  workflows?: MessageForm[];
}
