import { AuthHelper } from '@iss/ng-auth-center';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { UserFacadeAbstract } from './user.facade.abstract';
import * as UserFeature from '../../infrastructure/store/user/user.reducer';
import * as UserSelectors from '../../infrastructure/store/user/user.selectors';
import * as UserViewModelSelectors from '../../infrastructure/store/selectors/user-view-model.selectors';

/**
 * Фасад для работы со списком пользователей (обращения к хранилищу User)
 */
@Injectable({
  providedIn: 'root',
})
export class UserFacade implements UserFacadeAbstract {
  loaded$ = this.store.select(UserSelectors.getLoaded);
  all$ = this.store.select(UserSelectors.getAll);
  userGroups$ = this.store.select(UserViewModelSelectors.getGroupedUsers).pipe(
    map((userGroups) =>
      userGroups.map((userGroup) => ({
        ...userGroup,
        users: userGroup.users.map((user) => ({
          ...user,
          isCurrentUser: user.id_tn === this.authHelper.getJwtPayload().id_tn,
        })),
      }))
    )
  );

  constructor(private store: Store<UserFeature.UserPartialState>, private authHelper: AuthHelper) {}
}
