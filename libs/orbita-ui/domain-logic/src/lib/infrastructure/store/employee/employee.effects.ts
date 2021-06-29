import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, filter } from 'rxjs/operators';
import { isNumber } from '@orbita/orbita-ui/utils';

import { EmployeeApi } from './../../api/employee/employee.api';
import * as EmployeeFeature from './employee.reducer';
import * as EmployeeActions from './employee.actions';
import * as EmployeeSelectors from './employee.selectors';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeApi: EmployeeApi,
    private store: Store<EmployeeFeature.EmployeePartialState>
  ) {}

  loadSingleEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadSingleEmployee),
      withLatestFrom(this.store.select(EmployeeSelectors.getEmployeeSelectedId)),
      switchMap(([_action, idTn]) =>
        this.employeeApi.show(idTn).pipe(
          map((data) => EmployeeActions.loadSingleEmployeeSuccess({ employee: data.employee })),
          catchError((error) => of(EmployeeActions.loadSingleEmployeeFailure({ error })))
        )
      )
    )
  );

  selectEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.selectEmployee),
      withLatestFrom(this.store.select(EmployeeSelectors.getEmployeeSelectedId)),
      filter(([_action, idTn]) => isNumber(idTn)),
      map(EmployeeActions.loadSingleEmployee)
    )
  );
}
