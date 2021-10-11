import { Group } from './../models/group.interface';
import { User } from './../models/user.interface';

/**
 * Список исполнителей, сгруппированный по группам
 */
export interface UserGroup extends Group {
  /**
   * Список исполнителей
   */
  readonly users: User[];
}
