import { Observable, of } from 'rxjs';

import { User } from '../../entities/models/user.interface';

/**
 * Фасад для обращений к объектам SdRequest
 */
export abstract class UserFacadeAbstract {
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean> = of();

  /**
   * Список пользователей
   */
  all$: Observable<User[]> = of();

  /**
   * Инициализация стора
   */
  abstract init(): void;
}
