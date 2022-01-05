import { BehaviorSubject } from 'rxjs';

import { EmployeeFacadeAbstract } from './employee.facade.abstract';

export class EmployeeFacadeStub implements EmployeeFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
}
