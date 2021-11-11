import { BehaviorSubject } from 'rxjs';

import { ServiceDeskFacadeAbstract } from './service-desk.facade.abstract';

export class ServiceDeskFacadeStub implements ServiceDeskFacadeAbstract {
  loadingSdTickets$ = new BehaviorSubject(false);
  loadedSdTickets$ = new BehaviorSubject(false);
  loadSdTickets$ = new BehaviorSubject([]);
  sdTicket$ = new BehaviorSubject(null);
  sdTickets$ = new BehaviorSubject([]);
  sdServices$ = new BehaviorSubject([]);
  allFreeApplicationsViewModel$ = new BehaviorSubject([]);
}
