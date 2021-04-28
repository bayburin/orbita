import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../infrastructure/store/sd-request.actions';
import * as SdRequestFeature from '../infrastructure/store/sd-request.reducer';
import * as SdRequestSelectors from '../infrastructure/store/sd-request.selectors';

@Injectable()
export class SdRequestFacade implements SdRequestFacadeAbstract {
  loaded$ = this.store.select(SdRequestSelectors.getLoaded);
  all$ = this.store.select(SdRequestSelectors.getAll);
  selected$ = this.store.select(SdRequestSelectors.getSelected);

  constructor(private store: Store<SdRequestFeature.SdRequestPartialState>) {}

  loadAll() {
    this.store.dispatch(SdRequestActions.loadAll());
  }
}
