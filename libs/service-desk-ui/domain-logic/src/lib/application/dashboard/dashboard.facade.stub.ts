import { BehaviorSubject } from 'rxjs';

import { DashboardFacadeAbstract } from './dashboard.facade.abstract';

export class DashboardFacadeStub implements DashboardFacadeAbstract {
  loadingDashboard$ = new BehaviorSubject(false);
  loadedDashboard$ = new BehaviorSubject(false);

  loadDashboard() {
    /** */
  }
}
