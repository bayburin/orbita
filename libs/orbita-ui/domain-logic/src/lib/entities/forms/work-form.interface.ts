import { WorkerForm } from './worker-form.interface';

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
}
