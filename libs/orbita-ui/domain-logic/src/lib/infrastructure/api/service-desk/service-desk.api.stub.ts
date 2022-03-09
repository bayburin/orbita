import { of, Observable } from 'rxjs';

import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';
import { ServiceDeskApiAbstract } from './service-desk.api.abstract';

export class ServiceDeskApiStub implements ServiceDeskApiAbstract {
  api = '';

  getTickets(): Observable<SdTicket[]> {
    return of([]);
  }

  getTicket() {
    return of(null);
  }
}
