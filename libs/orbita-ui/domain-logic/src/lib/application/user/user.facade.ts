import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserFacadeAbstract } from './user.facade.abstract';
import * as UserFeature from '../../infrastructure/store/user/user.reducer';
import * as UserSelectors from '../../infrastructure/store/user/user.selectors';
import * as UserGroupSelectors from '../../infrastructure/store/view-model/user.selectors';

/**
 * Фасад для работы со списком пользователей (обращения к хранилищу User)
 */
@Injectable({
  providedIn: 'root',
})
export class UserFacade implements UserFacadeAbstract {
  loaded$ = this.store.select(UserSelectors.getLoaded);
  all$ = this.store.select(UserSelectors.getAll);
  userGroups$ = this.store.select(UserGroupSelectors.getGroupedUsers);

  constructor(private store: Store<UserFeature.UserPartialState>) {}
}
