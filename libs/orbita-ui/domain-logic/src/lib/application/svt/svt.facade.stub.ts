import { BehaviorSubject } from 'rxjs';

import { SvtFacadeAbstract } from './svt.facade.abstract';

export class SvtFacadeStub implements SvtFacadeAbstract {
  loadingItem$ = new BehaviorSubject(false);
  loadedItem$ = new BehaviorSubject(false);
  allItems$ = new BehaviorSubject(null);
  selectedItem$ = new BehaviorSubject(null);
  loadForFormItems$ = new BehaviorSubject(null);
  allForFormItems$ = new BehaviorSubject(null);

  loadItemsForForm() {
    /** */
  }

  removeAllItems() {
    /** */
  }
}
