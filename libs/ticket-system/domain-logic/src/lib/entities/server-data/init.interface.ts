import { User } from './../models/user.interface';
import { Group } from './../models/group.interface';

/**
 * Интерфейс, описывающий исходные данные, необходимые для работы приложения
 */
export interface Init {
  /**
   * Массив объектов User
   */
  users: User[];

  /**
   * Массив объектов Group
   */
  groups: Group[];
}
