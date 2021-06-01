import { Group } from './../models/group.interface';
import { HistoryViewModel } from './../view-models/history-view-model.interface';
import { WorkerViewModel } from './../view-models/worker-view-model.interface';

/**
 * Интерфейс "работы" по заявке. Под работой подразумевается группа Group, подключенная к заявке и решающая задачи в рамках своего подразделения.
 */
export interface WorkViewModel {
  /**
   * Идентификатор работы
   */
  readonly id: number;

  /**
   * Идентификатор заявки
   */
  readonly claim_id: number;

  /**
   * Массив произошедших событий
   */
  readonly histories: HistoryViewModel[];

  /**
   * Группа, к которой относится исполнитель
   */
  readonly group: Group;

  /**
   * Массив исполнителей
   */
  readonly workers: WorkerViewModel[];
}
