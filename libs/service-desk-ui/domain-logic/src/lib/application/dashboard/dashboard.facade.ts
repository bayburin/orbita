import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DashboardFacadeAbstract } from './dashboard.facade.abstract';
import * as DashboardFeature from './../../infrastructure/store/dashboard/dashboard.reducer';
import * as DashboardSelectors from '../../infrastructure/store/dashboard/dashboard.selectors';
import * as DashboardActions from '../../infrastructure/store/dashboard/dashboard.actions';

/**
 * Фасад для работы с дашбоардом
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardFacade implements DashboardFacadeAbstract {
  loadingDashboard$ = this.store.select(DashboardSelectors.getLoadingDashboard);
  loadedDashboard$ = this.store.select(DashboardSelectors.getLoadedDashboard);

  constructor(private store: Store<DashboardFeature.DashboardPartialState>) {}

  loadDashboard() {
    this.store.dispatch(DashboardActions.loadDashboard());
  }
}
