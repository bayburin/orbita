import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SvtItemFeature from '../../infrastructure/store/svt-item/svt-item.reducer';
import * as SvtItemActions from '../../infrastructure/store/svt-item/svt-item.actions';
import * as SvtItemSelectors from '../../infrastructure/store/svt-item/svt-item.selectors';
import { SvtFacadeAbstract } from './svt.facade.abstract';
import { SvtFilters } from './../../entities/filter.interface';
import { PrimeFilter } from './../../entities/prime-filter.interface';
import { processSvtItemTableFilters } from '../../infrastructure/utils/process-svt-item-table-filters.function';

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

  searchSvtItems(filters: PrimeFilter) {
    const searchFlag = Object.keys(filters).some((filter) => Boolean(filters[filter].value));

    if (searchFlag) {
      filters = processSvtItemTableFilters(filters);
      this.store.dispatch(SvtItemActions.loadAll({ filters }));
    } else {
      this.removeAllItems();
    }
  }

  loadItemsForForm(filters: SvtFilters) {
    this.store.dispatch(SvtItemActions.loadAllForForm({ filters }));
  }

  removeAllItems() {
    this.store.dispatch(SvtItemActions.clearAll());
  }
}
