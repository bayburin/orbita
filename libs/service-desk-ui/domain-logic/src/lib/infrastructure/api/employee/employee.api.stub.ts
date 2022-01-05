import { of } from 'rxjs';

import { EmployeeApiAbstract } from './employee.api.abstract';

export class EmployeeApiStub implements EmployeeApiAbstract {
  api = '';

  queryByTns() {
    return of([]);
  }
}
