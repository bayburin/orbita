import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { KaseFacadeAbstract } from './kase.facade.abstract';
import * as KaseFeature from '../../infrastructure/store/kase/kase.reducer';
import * as KaseSelectors from '../../infrastructure/store/kase/kase.selectors';
import * as KaseActions from '../../infrastructure/store/kase/kase.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с категориями
 */
@Injectable({
  providedIn: 'root',
})
export class KaseFacade implements KaseFacadeAbstract {
  all$ = this.store.select(KaseSelectors.getAll);
  initLoading$ = this.store.select(KaseSelectors.getInitLoading);
  loading$ = this.store.select(KaseSelectors.getLoading);
  loaded$ = this.store.select(KaseSelectors.getLoaded);
  statuses$ = this.store.select(KaseSelectors.getStatuses);

  constructor(private store: Store<KaseFeature.KasePartialState>) {}

  init() {
    this.store.dispatch(KaseActions.init());
  }

  loadAll(statusId: number) {
    this.store.dispatch(KaseActions.loadAll({ statusId }));
  }
}
