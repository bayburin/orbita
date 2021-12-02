import { BehaviorSubject } from 'rxjs';

import { CategoryFacadeAbstract } from './category.facade.abstract';

export class CategoryFacadeStub implements CategoryFacadeAbstract {
  all$ = new BehaviorSubject([]);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);

  loadAll() {
    /** */
  }
}
