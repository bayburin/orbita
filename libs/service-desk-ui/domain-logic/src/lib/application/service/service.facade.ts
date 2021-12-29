import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ServiceFacadeAbstract } from './service.facade.abstract';
import * as ServiceFeature from '../../infrastructure/store/service/service.reducer';
import * as ServiceSelectors from '../../infrastructure/store/service/service.selectors';
import * as ServiceActions from '../../infrastructure/store/service/service.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с услугами
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceFacade implements ServiceFacadeAbstract {
  entity$ = this.store.select(ServiceSelectors.getSelected);
  selected$ = this.store.select(VMSelectors.getSelectedServiceVM);
  loading$ = this.store.select(ServiceSelectors.getLoading);
  loaded$ = this.store.select(ServiceSelectors.getLoaded);
  entities$ = this.store.select(ServiceSelectors.getAll);

  constructor(private store: Store<ServiceFeature.ServicePartialState>) {}

  loadSelected() {
    this.store.dispatch(ServiceActions.loadSelected());
  }
}
