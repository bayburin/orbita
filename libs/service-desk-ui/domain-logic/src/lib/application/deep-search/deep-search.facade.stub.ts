import { BehaviorSubject } from 'rxjs';

import { DeepSearchFacadeAbstract } from './deep-search.facade.abstract';

export class DeepSearchFacadeStub implements DeepSearchFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  result$ = new BehaviorSubject([]);
  resultTypes$ = new BehaviorSubject([]);
  selectedResultTypeId$ = new BehaviorSubject('');
  isAnyResult$ = new BehaviorSubject(false);

  search() {
    /** */
  }

  setSelectedResultTypeId() {
    /** */
  }

  clearSearchResult() {
    /** */
  }
}
