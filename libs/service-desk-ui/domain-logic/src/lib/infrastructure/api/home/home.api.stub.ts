import { of } from 'rxjs';

import { HomeApiAbstract } from './home.api.abstract';

export class HomeApiStub implements HomeApiAbstract {
  api = '';

  loadHomeData() {
    return of(null);
  }

  search() {
    return of(null);
  }
}
