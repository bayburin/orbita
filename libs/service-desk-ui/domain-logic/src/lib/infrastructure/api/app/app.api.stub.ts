import { of } from 'rxjs';

import { AppApiAbstract } from './app.api.abstract';

export class AppApiStub implements AppApiAbstract {
  api = '';

  init() {
    return of(null);
  }

  appVersion() {
    return of(null);
  }
}
