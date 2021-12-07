import { BehaviorSubject } from 'rxjs';

import { SearchFacadeAbstract } from './search.facade.abstract';

export class SearchFacadeStub implements SearchFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  result$ = new BehaviorSubject([]);

  search() {
    /** */
  }
}
