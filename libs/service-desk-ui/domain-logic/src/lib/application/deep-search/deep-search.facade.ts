import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DeepSearchFacadeAbstract } from './deep-search.facade.abstract';
import * as DeepSearchFeature from '../../infrastructure/store/deep-search/deep-search.reducer';
import * as DeepSearchSelectors from '../../infrastructure/store/deep-search/deep-search.selectors';
import * as DeepSearchActions from '../../infrastructure/store/deep-search/deep-search.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы со данными поиска для страницы поиска
 */
@Injectable({
  providedIn: 'root',
})
export class DeepSearchFacade implements DeepSearchFacadeAbstract {
  loading$ = this.store.select(DeepSearchSelectors.getLoading);
  loaded$ = this.store.select(DeepSearchSelectors.getLoaded);
  result$ = this.store.select(VMSelectors.getDeepSearchResult);

  constructor(private store: Store<DeepSearchFeature.DeepSearchPartialState>) {}

  search() {
    this.store.dispatch(DeepSearchActions.search());
  }
}
