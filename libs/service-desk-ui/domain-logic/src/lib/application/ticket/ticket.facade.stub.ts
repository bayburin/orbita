import { BehaviorSubject } from 'rxjs';

import { TicketFacadeAbstract } from './ticket.facade.abstract';

export class TicketFacadeStub implements TicketFacadeAbstract {
  ticket$ = new BehaviorSubject(null);
  loaded$ = new BehaviorSubject(false);

  loadSelected() {
    /** */
  }
}
