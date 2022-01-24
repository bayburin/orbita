import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AdminServiceFacadeAbstract } from './admin-service.facade.abstract';
import * as ServiceFeature from '../../../infrastructure/store/service/service.reducer';
import * as ServiceSelectors from '../../../infrastructure/store/service/service.selectors';
import * as ServiceActions from '../../../infrastructure/store/service/service.actions';
import * as VMSelectors from '../../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с услугами
 */
@Injectable({
  providedIn: 'root',
})
export class AdminServiceFacade implements AdminServiceFacadeAbstract {
  all$ = this.store
    .select(VMSelectors.getAllServicesVM)
    .pipe(map((services) => services.sort((a, b) => (a.id > b.id ? -1 : 1))));
  loading$ = this.store.select(ServiceSelectors.getLoading);
  loaded$ = this.store.select(ServiceSelectors.getLoaded);

  constructor(private store: Store<ServiceFeature.ServicePartialState>) {}

  loadAll() {
    this.store.dispatch(ServiceActions.adminLoadAll());
  }
}
