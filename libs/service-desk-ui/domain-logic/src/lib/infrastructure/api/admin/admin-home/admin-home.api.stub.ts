import { of } from 'rxjs';

import { AdminHomeApiAbstract } from './admin-home.api.abstract';

export class AdminHomeApiStub implements AdminHomeApiAbstract {
  api = '';

  loadHomeData() {
    return of(null);
  }
}
