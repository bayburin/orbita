import { of } from 'rxjs';

import { EventApiAbstract } from './event.api.abstract';

export class EventApiStub implements EventApiAbstract {
  api = '';

  create() {
    return of({ message: 'ok' });
  }
}
