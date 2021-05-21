import { Observable, of } from 'rxjs';

import { User } from '../../entities/models/user.interface';

export abstract class UserFacadeAbstract {
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean> = of();

  /**
   * Список пользователей
   */
  all$: Observable<User[]> = of();
}
