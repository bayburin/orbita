import { BehaviorSubject } from 'rxjs';

import { EmployeeFacadeAbstract } from './employee.facade.abstract';

export class EmployeeFacadeStub implements EmployeeFacadeAbstract {
  loadingEmployee$ = new BehaviorSubject(false);
  loadedEmployee$ = new BehaviorSubject(false);
  employee$ = new BehaviorSubject(null);
  allShort$ = new BehaviorSubject(null);
  loadedAllShort$ = new BehaviorSubject(false);
  totalCountShort$ = new BehaviorSubject(null);
  loadingShort$ = new BehaviorSubject(false);

  overviewSingleEmployee() {
    /** */
  }

  search() {
    /** */
  }

  searchBySingleProp() {
    /** */
  }

  clearEmployeeShortEntities() {
    /** */
  }
}
