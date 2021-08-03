import { BehaviorSubject } from 'rxjs';

import { ServiceDeskFacadeAbstract } from './service-desk.facade.abstract';

export class ServiceDeskFacadeStub implements ServiceDeskFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  loadSdTickets$ = new BehaviorSubject([]);
  sdTickets$ = new BehaviorSubject([]);
  sdServices$ = new BehaviorSubject([]);
  allFreeApplicationsViewModel$ = new BehaviorSubject([]);
}
