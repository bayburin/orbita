import { Observable, of } from 'rxjs';

import { User } from '../../entities/models/user.interface';
import { UserGroup } from './../../entities/view-models/user-group.interface';

export abstract class UserFacadeAbstract {
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Список пользователей
   */
  all$: Observable<User[]>;
  /**
   * Список пользователей, сгруппированный по группам
   */
  userGroups$: Observable<UserGroup[]>;
}
