import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchResultTypes } from './../../entities/models/search-result.types';
import { SearchFacadeAbstract } from './search.facade.abstract';
import * as SearchFeature from '../../infrastructure/store/search/search.reducer';
import * as SearchSelectors from '../../infrastructure/store/search/search.selectors';
import * as SearchActions from '../../infrastructure/store/search/search.actions';
import { isService } from '../../infrastructure/utils/service.functions';
import { isQuestion } from '../../infrastructure/utils/question.functions';

/**
 * Фасад для работы с поисковой строкой
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

  getLink(result: SearchResultTypes): string {
    if (isService(result)) {
      return `/categories/${result.category_id}/services/${result.id}`;
    } else if (isQuestion(result)) {
      return `/categories/${result.ticket.service.category_id}/services/${result.ticket.service_id}?identity=${result.ticket.identity}`;
    } else {
      return `/categories/${result.id}`;
    }
  }
}
