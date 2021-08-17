import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as EmployeeFeature from '../../infrastructure/store/employee/employee.reducer';
import * as EmployeeActions from '../../infrastructure/store/employee/employee.actions';
import * as EmployeeSelectors from '../../infrastructure/store/employee/employee.selectors';
import { EmployeeFacadeAbstract } from './employee.facade.abstract';
import { PrimeFilter } from '../../entities/prime-filter.interface';
import { PrimeFilterFactory } from './../../infrastructure/factories/prime-filter.factory';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFacade implements EmployeeFacadeAbstract {
  // ========== Подтип хранилища Employee ==========

  loadingEmployee$ = this.store.select(EmployeeSelectors.getEmployeeLoading);
  loadedEmployee$ = this.store.select(EmployeeSelectors.getEmployeeLoaded);
  employee$ = this.store.select(EmployeeSelectors.getEmployeeSelected);

  // ========== Подтип хранилища EmployeeShort ==========

  allShort$ = this.store.select(EmployeeSelectors.getEmployeeShortAll);
  loadedAllShort$ = this.store.select(EmployeeSelectors.getEmployeeShortLoaded);
  totalCountShort$ = this.store.select(EmployeeSelectors.getEmployeeShortTotalCount);
  loadingShort$ = this.store.select(EmployeeSelectors.getEmployeeShortLoading);

  constructor(private store: Store<EmployeeFeature.EmployeePartialState>) {}

  loadEmployeeByRoute() {
    this.store.dispatch(EmployeeActions.selectEmployeeByRoute());
  }

  search(filters: PrimeFilter) {
    const searchFlag = Object.keys(filters).some((filter) => Boolean(filters[filter].value));

    if (searchFlag) {
      this.store.dispatch(EmployeeActions.loadAllEmployeeShort({ filters }));
    } else {
      this.clearEmployeeShortEntities();
    }
  }

  searchBySingleProp(key: string, value: string) {
    const filter = PrimeFilterFactory.createFilter(key, value, 'contains');

    this.search(filter);
  }

  clearEmployeeShortEntities() {
    this.store.dispatch(EmployeeActions.clearAllEmployeeShort());
  }
}
