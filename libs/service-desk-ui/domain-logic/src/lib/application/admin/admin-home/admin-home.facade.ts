import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AdminHomeFacadeAbstract } from './admin-home.facade.abstract';
import * as AdminHomeSelectors from '../../../infrastructure/store/admin-home/admin-home.selectors';
import * as AdminHomeActions from '../../../infrastructure/store/admin-home/admin-home.actions';
import * as AdminHomeFeature from '../../../infrastructure/store/admin-home/admin-home.reducer';

/**
 * Фасад для работы с админкой категорий
 */
@Injectable({
  providedIn: 'root',
})
export class AdminHomeFacade implements AdminHomeFacadeAbstract {
  loading$ = this.store.select(AdminHomeSelectors.getLoading);
  loaded$ = this.store.select(AdminHomeSelectors.getLoaded);

  constructor(private store: Store<AdminHomeFeature.AdminHomePartialState>) {}

  init() {
    this.store.dispatch(AdminHomeActions.loadHome());
  }
}
