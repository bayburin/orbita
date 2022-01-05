import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EmployeeFacadeAbstract } from './employee.facade.abstract';
import * as EmployeeFeature from '../../infrastructure/store/employee/employee.reducer';
import * as EmployeeSelectors from '../../infrastructure/store/employee/employee.selectors';

/**
 * Фасад для работы с работниками
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeeFacade implements EmployeeFacadeAbstract {
  loading$ = this.store.select(EmployeeSelectors.getLoading);
  loaded$ = this.store.select(EmployeeSelectors.getLoaded);

  constructor(private store: Store<EmployeeFeature.EmployeePartialState>) {}
}
