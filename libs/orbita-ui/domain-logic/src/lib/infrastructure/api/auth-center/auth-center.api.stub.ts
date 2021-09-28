import { of } from 'rxjs';

import { AuthCenterApiAbstract } from './auth-center.api.abstract';

export class AuthCenterApiStub implements AuthCenterApiAbstract {
  api = '';

  showHost() {
    return of(null);
  }

  showEmployeeHosts() {
    return of([]);
  }
}
