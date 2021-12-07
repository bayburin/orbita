import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchFacadeAbstract } from './search.facade.abstract';
import * as SearchFeature from '../../infrastructure/store/search/search.reducer';
import * as SearchSelectors from '../../infrastructure/store/search/search.selectors';
import * as SearchActions from '../../infrastructure/store/search/search.actions';

/**
 * Фасад для работы с дашбоардом
 */
@Injectable({
  providedIn: 'root',
})
export class SearchFacade implements SearchFacadeAbstract {
  loading$ = this.store.select(SearchSelectors.getLoading);
  loaded$ = this.store.select(SearchSelectors.getLoaded);
  result$ = this.store.select(SearchSelectors.getSearchResult);

  constructor(private store: Store<SearchFeature.SearchPartialState>) {}

  search(term: string) {
    this.store.dispatch(SearchActions.search({ term }));
  }
}
