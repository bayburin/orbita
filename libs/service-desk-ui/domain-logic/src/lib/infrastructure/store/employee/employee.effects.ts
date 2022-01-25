import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';

import { EmployeeApi } from './../../api/employee/employee.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as EmployeeActions from './employee.actions';
import * as EmployeeFeature from './employee.reducer';
import * as EmployeeSelectors from './employee.selectors';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EmployeeFeature.State>,
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

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.search),
      withLatestFrom(this.store.select(EmployeeSelectors.getIds), this.store.select(EmployeeSelectors.getSearchIds)),
      map(([action, ids, searchIds]) => {
        // FIXME: Сейчас механизм удаления не работает, так как вчё что есть в searchIds есть и в ids
        // Нужно выделить то что принадлежит вопросам и услугам в отдельные serviceIds и ticketIds
        const removeIds = searchIds.filter((id) => !(ids as number[]).includes(id));

        return EmployeeActions.searchStart({ ids: removeIds, key: action.key, value: action.value });
      })
    )
  );

  searchStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.searchStart),
      switchMap((action) =>
        this.employeeApi.search(action.key, action.value).pipe(
          map((employees) => EmployeeActions.searchSuccess({ employees })),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось найти работников.');

            return of(EmployeeActions.searchFailure({ error }));
          })
        )
      )
    )
  );
}
