import { User } from './../models/user.interface';
import { Group } from './../models/group.interface';
import { EventType } from './../models/event-type.interface';
import { Application } from './../models/application.interface';

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

  /**
   * Массив приложений
   */
  applications: Application[];
}

/**
 * Описывает ответ сервера по запросу исходных данных для работы приложения
 */
export interface InitServerData {
  /**
   * Объект данных
   */
  init: Init;
}
