import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as EmployeeFeature from '../../infrastructure/store/employee/employee.reducer';
import * as EmployeeActions from '../../infrastructure/store/employee/employee.actions';
import * as EmployeeSelectors from '../../infrastructure/store/employee/employee.selectors';
import { EmployeeFacadeAbstract } from './employee.facade.abstract';
import { SearchEmployeeKeys } from './../../entities/search-employee-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFacade implements EmployeeFacadeAbstract {
  loadingEmployee$ = this.store.select(EmployeeSelectors.getEmployeeLoading);
  loadedEmployee$ = this.store.select(EmployeeSelectors.getEmployeeLoaded);
  employee$ = this.store.select(EmployeeSelectors.getEmployeeSelected);
  allShort$ = this.store.select(EmployeeSelectors.getEmployeeShortAll);

  constructor(private store: Store<EmployeeFeature.EmployeePartialState>) {}

  search(key: SearchEmployeeKeys, value: string) {
    if (value) {
      this.store.dispatch(EmployeeActions.loadAllEmployeeShort({ key, value }));
    }
  }
}
