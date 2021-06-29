import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SvtFeature from '../../infrastructure/store/svt-item/svt-item.reducer';
import * as SvtActions from '../../infrastructure/store/svt-item/svt-item.actions';
import * as SvtSelectors from '../../infrastructure/store/svt-item/svt-item.selectors';
import { SvtFacadeAbstract } from './svt.facade.abstract';

@Injectable({
  providedIn: 'root',
})
export class SvtFacade implements SvtFacadeAbstract {
  loadingItem$ = this.store.select(SvtSelectors.getLoading);
  loadedItem$ = this.store.select(SvtSelectors.getLoaded);
  selectedItem$ = this.store.select(SvtSelectors.getSelected);

  constructor(private store: Store<SvtFeature.SvtItemPartialState>) {}
}
