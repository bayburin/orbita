import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DashboardFacadeAbstract } from './dashboard.facade.abstract';
import * as DashboardFeature from './../../infrastructure/store/dashboard/dashboard.reducer';
import * as DashboardSelectors from '../../infrastructure/store/dashboard/dashboard.selectors';
import * as DashboardActions from '../../infrastructure/store/dashboard/dashboard.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с дашбоардом
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardFacade implements DashboardFacadeAbstract {
  loading$ = this.store.select(DashboardSelectors.getLoading);
  loaded$ = this.store.select(DashboardSelectors.getLoaded);
  categories$ = this.store.select(VMSelectors.getDashboardCategoriesVM);
  services$ = this.store.select(VMSelectors.getDashboardServicesVM);

  constructor(private store: Store<DashboardFeature.DashboardPartialState>) {}

  loadDashboard() {
    this.store.dispatch(DashboardActions.loadDashboard());
  }
}
