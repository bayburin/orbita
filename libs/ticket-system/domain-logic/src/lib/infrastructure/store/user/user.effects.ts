import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { UserApi } from './../../api/user/user.api';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userApi: UserApi
  ) {}

  // loadAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loadAll),
  //     switchMap(() => this.userApi.query()
  //       .pipe(
  //         map(users => UserActions.loadAllSuccess({ users })),
  //         catchError(error => of(UserActions.loadAllFailure({ error })))
  //       )
  //     )
  //   )
  // );
}
