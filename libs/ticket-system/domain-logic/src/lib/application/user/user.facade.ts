import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { tap, switchMap, catchError, map, distinctUntilChanged, share, startWith, filter } from 'rxjs/operators';

import { UserFacadeAbstract } from './user.facade.abstract';
import * as UserActions from '../../infrastructure/store/user/user.actions';
import * as UserFeature from '../../infrastructure/store/user/user.reducer';
import * as UserSelectors from '../../infrastructure/store/user/user.selectors';
import { UserApi } from '../../infrastructure/api/user/user.api';

/**
 * Фасад для работы со списком пользователей (обращения к хранилищу User)
 */
@Injectable({
  providedIn: 'root'
})
export class UserFacade implements UserFacadeAbstract {
  loaded$ = this.store.select(UserSelectors.getLoaded);
  loadUsers$ = this.loaded$.pipe(
    filter(loaded => !loaded),
    tap(() => this.store.dispatch(UserActions.loadAll())),
    switchMap(() =>
      this.userApi.query()
        .pipe(
          tap(userQueue => this.store.dispatch(UserActions.loadAllSuccess({ users: userQueue.users }))),
          catchError(error => of(this.store.dispatch(UserActions.loadAllFailure({ error }))))
        )
    ),
    share()
  );
  all$ = combineLatest([
    this.loadUsers$.pipe(startWith(null)),
    this.store.select(UserSelectors.getAll)
  ]).pipe(
    map(([_dispatcher, selector]) => selector),
    distinctUntilChanged()
  );

  constructor(
    private store: Store<UserFeature.UserPartialState>,
    private userApi: UserApi
  ) {}
}
