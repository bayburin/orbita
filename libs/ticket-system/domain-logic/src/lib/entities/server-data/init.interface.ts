import { User } from './../models/user.interface';
import { Group } from './../models/group.interface';
import { EventType } from './../models/event-type.interface';

/**
 * Интерфейс, описывающий исходные данные, необходимые для работы приложения
 */
export interface Init {
  /**
   * Массив пользователей
   */
  users: User[];

  /**
   * Массив групп
   */
  groups: Group[];

  /**
   * Массив видов событий
   */
  event_types: EventType[];
}
