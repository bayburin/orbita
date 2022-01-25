import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as ResponsibleUserActions from './responsible-user.actions';
import * as EmployeeActions from '../employee/employee.actions';

@Injectable()
export class ResponsibleUserEffects {
  constructor(private readonly actions$: Actions) {}

  setEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResponsibleUserActions.setEntities),
      map((action) => EmployeeActions.loadAll({ tns: Object.values(action.entities).map((entity) => entity.tn) }))
    )
  );

  setMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResponsibleUserActions.setMany),
      map((action) => EmployeeActions.loadMany({ tns: action.responsibleUsers.map((user) => user.tn) }))
    )
  );
}
