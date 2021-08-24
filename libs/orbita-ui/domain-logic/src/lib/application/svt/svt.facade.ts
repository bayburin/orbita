import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SvtItemFeature from '../../infrastructure/store/svt-item/svt-item.reducer';
import * as SvtItemActions from '../../infrastructure/store/svt-item/svt-item.actions';
import * as SvtItemSelectors from '../../infrastructure/store/svt-item/svt-item.selectors';
import { SvtFacadeAbstract } from './svt.facade.abstract';
import { SvtFilters } from './../../entities/filter.interface';

/**
 * Фасад для работы с данными из СВТ (обращения к хранилищу SvtItem)
 */
@Injectable({
  providedIn: 'root',
})
export class SvtFacade implements SvtFacadeAbstract {
  loadingItem$ = this.store.select(SvtItemSelectors.getLoading);
  loadedItem$ = this.store.select(SvtItemSelectors.getLoaded);
  allItems$ = this.store.select(SvtItemSelectors.getAll);
  selectedItem$ = this.store.select(SvtItemSelectors.getSelected);
  allForFormItems$ = this.store.select(SvtItemSelectors.getAll);

  constructor(private store: Store<SvtItemFeature.SvtItemPartialState>) {}

  loadItemsForForm(filters: SvtFilters) {
    this.store.dispatch(SvtItemActions.loadAllForForm({ filters }));
  }

  removeAllItems() {
    this.store.dispatch(SvtItemActions.clearAll());
  }
}
