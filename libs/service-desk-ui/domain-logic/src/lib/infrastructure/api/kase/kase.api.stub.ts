import { of } from 'rxjs';

import { KaseApiAbstract } from './kase.api.abstract';

export class KaseApiStub implements KaseApiAbstract {
  api = '';

  query() {
    return of({ apps: [], statuses: [] });
  }

  revoke() {
    return of(null);
  }

  update() {
    return of(null);
  }

  save() {
    return of(null);
  }
}
