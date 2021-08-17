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
import * as SdRequestActions from '../sd-request/sd-request.actions';
import * as SvtItemActions from '../svt-item/svt-item.actions';
import * as RouterSelectors from '../selectors/router.selectors';
import { PrimeFilterFactory } from './../../factories/prime-filter.factory';
import { EmployeeFilters } from './../../../entities/models/employee/employee-filters.enum';

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
          map((employee) =>
            employee.id
              ? EmployeeActions.loadSingleEmployeeSuccess({ employee: employee })
              : EmployeeActions.loadSingleEmployeeNotFound()
          ),
          catchError((error) => of(EmployeeActions.loadSingleEmployeeFailure({ error })))
        )
      )
    )
  );

  selectEmployeeByRoute = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.selectEmployeeByRoute),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      map(([_action, routerParams]) => EmployeeActions.selectEmployee({ idTn: routerParams.id_tn }))
    )
  );

  selectEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.selectEmployee),
      filter((action) => isNumber(action.idTn)),
      map(EmployeeActions.loadSingleEmployee)
    )
  );

  loadAllEmployeeShort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadAllEmployeeShort),
      switchMap((action) =>
        this.employeeApi.query(action.filters).pipe(
          map((data) => EmployeeActions.loadAllEmployeeShortSuccess({ employees: data.employees })),
          catchError((error) => of(EmployeeActions.loadSingleEmployeeFailure({ error })))
        )
      )
    )
  );

  loadEmployeeShortForNewForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployeeShortForNewForm),
      switchMap((action) => {
        const filters = PrimeFilterFactory.createFilter(EmployeeFilters.ID_TN, action.idTn);

        return this.employeeApi.query(filters).pipe(
          map((data) => EmployeeActions.loadEmployeeShortForNewFormSuccess({ employees: data.employees })),
          catchError((error) => of(EmployeeActions.loadEmployeeShortForNewFormFailure({ error })))
        );
      })
    )
  );

  loadEmployeeShortForNewFormSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployeeShortForNewFormSuccess),
      switchMap((action) => {
        const employee = action.employees[0];

        return [
          SdRequestActions.setEmployeeToNewForm({ employee }),
          SvtItemActions.setFormFilters({ filters: { id_tn: employee.id } }),
        ];
      })
    )
  );
}
