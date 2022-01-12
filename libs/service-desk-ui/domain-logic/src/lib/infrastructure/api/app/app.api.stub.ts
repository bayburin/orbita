import { of } from 'rxjs';

import { AppApiAbstract } from './app.api.abstract';

export class AppApiStub implements AppApiAbstract {
  api = '';

  appVersion() {
    return of(null);
  }
}
