import { of } from 'rxjs';

import { EmployeeApiAbstract } from './employee.api.abstract';

export class EmployeeApi implements EmployeeApiAbstract {
  readonly api = '';

  show() {
    return of(null);
  }

  query() {
    return of(null);
  }
}
