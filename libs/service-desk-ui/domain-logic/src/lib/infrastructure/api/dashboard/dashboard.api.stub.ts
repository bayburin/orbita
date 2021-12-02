import { of } from 'rxjs';

import { DashboardApiAbstract } from './dashboard.api.abstract';

export class DashboardApiStub implements DashboardApiAbstract {
  api = '';

  loadDashboardData() {
    return of(null);
  }
}
