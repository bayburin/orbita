import { of } from 'rxjs';

import { SvtApiAbstract } from './svt.api.abstract';

export class SvtApiStub implements SvtApiAbstract {
  api = '';

  show() {
    return of(null);
  }

  queryItems() {
    return of([]);
  }

  queryUserItems() {
    return of(null);
  }
}
