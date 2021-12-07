import { BehaviorSubject } from 'rxjs';

import { DashboardFacadeAbstract } from './dashboard.facade.abstract';

export class DashboardFacadeStub implements DashboardFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  categories$ = new BehaviorSubject([]);
  services$ = new BehaviorSubject([]);

  loadDashboard() {
    /** */
  }
}
