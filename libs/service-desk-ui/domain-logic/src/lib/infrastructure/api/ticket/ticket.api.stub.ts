import { of } from 'rxjs';

import { TicketApiAbstract } from './ticket.api.abstract';

export class TicketApiStub implements TicketApiAbstract {
  api = '';

  show() {
    return of(null);
  }
}
