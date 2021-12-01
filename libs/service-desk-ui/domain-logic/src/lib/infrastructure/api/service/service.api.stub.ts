import { of } from 'rxjs';

import { ServiceApiAbstract } from './service.api.abstract';

export class ServiceApiStub implements ServiceApiAbstract {
  api = '';

  query() {
    return of([]);
  }

  show() {
    return of(null);
  }
}
