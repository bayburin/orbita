import { Group } from './../models/group.interface';
import { HistoryViewModel } from './../view-models/history-view-model.interface';

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
   * Массив объектов History
   */
  readonly histories: HistoryViewModel[];

  /**
   * Объект Group
   */
  readonly group: Group;

  /**
   * Массив обьъектов UserWork
   */
  // readonly workers: UserWork[];
}
