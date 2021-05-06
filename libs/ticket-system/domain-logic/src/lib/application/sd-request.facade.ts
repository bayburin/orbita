import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestFeature from '../infrastructure/store/sd-request/sd-request.reducer';
import * as SdRequestSelectors from '../infrastructure/store/sd-request/sd-request.selectors';

@Injectable({
  providedIn: 'root'
})
export class SdRequestFacade implements SdRequestFacadeAbstract {
  all$ = this.store.select(SdRequestSelectors.getAll);
  selected$ = this.store.select(SdRequestSelectors.getSelected);
  page$ = this.store.select(SdRequestSelectors.getPage);
  totalCount$ = this.store.select(SdRequestSelectors.getTotalCount);
  maxSize$ = this.store.select(SdRequestSelectors.getMaxSize);
  loading$ = this.store.select(SdRequestSelectors.getLoading);
  loaded$ = this.store.select(SdRequestSelectors.getLoaded);

  constructor(private store: Store<SdRequestFeature.SdRequestPartialState>) {}

  loadAll() {
    this.store.dispatch(SdRequestActions.loadAll());
  }

  setPage(page: number) {
    this.store.dispatch(SdRequestActions.SetPage({ page }));
  }
}
