import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { HomeFacadeAbstract } from './home.facade.abstract';
import * as HomeFeature from './../../infrastructure/store/home/home.reducer';
import * as HomeSelectors from '../../infrastructure/store/home/home.selectors';
import * as HomeActions from '../../infrastructure/store/home/home.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с дашбоардом
 */
@Injectable({
  providedIn: 'root',
})
export class HomeFacade implements HomeFacadeAbstract {
  loading$ = this.store.select(HomeSelectors.getLoading);
  loaded$ = this.store.select(HomeSelectors.getLoaded);
  categories$ = this.store.select(VMSelectors.getHomeCategoriesVM);
  services$ = this.store.select(VMSelectors.getHomeServicesVM);

  constructor(private store: Store<HomeFeature.HomePartialState>) {}

  loadHome() {
    this.store.dispatch(HomeActions.loadHome());
  }
}
