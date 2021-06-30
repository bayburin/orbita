import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, filter } from 'rxjs/operators';

import { AuthCenterApi } from './../../api/auth-center/auth-center.api';
import * as HostFeature from './host.reducer';
import * as HostActions from './host.actions';
import * as HostSelectors from './host.selectors';
import { HostFilterBuilder } from './../../builders/host-filter.builder';

@Injectable()
export class HostEffects {
  constructor(
    private actions$: Actions,
    private acApi: AuthCenterApi,
    private store: Store<HostFeature.HostPartialState>
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HostActions.loadSelected),
      withLatestFrom(this.store.select(HostSelectors.getSelectedId)),
      switchMap(([_action, inventNum]) => {
        const filter = new HostFilterBuilder().idField('id').id(inventNum).build();

        return this.acApi.showHost(filter).pipe(
          map((host) => HostActions.loadSelectedSuccess({ host })),
          catchError((error) => of(HostActions.loadSelectedFailure({ error })))
        );
      })
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HostActions.select),
      filter((action) => action.inventNum.length > 0),
      map(HostActions.loadSelected)
    )
  );
}