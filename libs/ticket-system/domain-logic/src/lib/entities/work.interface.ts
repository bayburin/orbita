import { Group } from './group.interface';
import { History } from './history.interface';
import { UserWork } from './user-work.interface';

/**
 * Интерфейс "работы" по заявке. Под работой подразумевается группа Group, подключенная к заявке и решающая задачи в рамках своего подразделения.
 */
export interface Work {
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
  readonly histories: History[];

  /**
   * Объект Group
   */
  readonly group: Group;

  /**
   * Массив обьъектов UserWork
   */
  readonly workers: UserWork[];
}
