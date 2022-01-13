import { fetch } from '@nrwl/angular';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { EmployeeApi } from './../../api/employee/employee.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeApi: EmployeeApi,
    private errorHandlerService: ErrorHandlerService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadAll),
      fetch({
        run: (action) =>
          this.employeeApi
            .queryByTns(action.tns)
            .pipe(map((employees) => EmployeeActions.loadAllSuccess({ employees }))),
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error, 'Не удалось загрузить данные по ответственным.');

          return EmployeeActions.loadAllFailure({ error });
        },
      })
    )
  );
}
