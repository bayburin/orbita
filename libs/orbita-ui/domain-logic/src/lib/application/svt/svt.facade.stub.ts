import { BehaviorSubject } from 'rxjs';

import { SvtFacadeAbstract } from './svt.facade.abstract';

export class SvtFacadeStub implements SvtFacadeAbstract {
  loadingItem$ = new BehaviorSubject(false);
  loadedItem$ = new BehaviorSubject(false);
  selectedItem$ = new BehaviorSubject(null);
  loadAllItems$ = new BehaviorSubject(null);
  allItems$ = new BehaviorSubject(null);

  loadItemsForForm() {
    /** */
  }

  removeAllItems() {
    /** */
  }
}
