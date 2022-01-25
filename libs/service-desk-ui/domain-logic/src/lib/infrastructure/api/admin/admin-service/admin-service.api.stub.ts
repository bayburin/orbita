import { of } from 'rxjs';

import { AdminServiceApiAbstract } from './admin-service.api.abstract';

export class AdminServiceApiStub implements AdminServiceApiAbstract {
  api = '';

  query() {
    return of([]);
  }

  show() {
    return of(null);
  }

  save() {
    return of(null);
  }

  update() {
    return of(null);
  }

  destroy() {
    return of(null);
  }
}
