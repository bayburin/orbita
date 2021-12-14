import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ServiceFacadeAbstract } from './service.facade.abstract';
import * as ServiceFeature from '../../infrastructure/store/service/service.reducer';
import * as ServiceSelectors from '../../infrastructure/store/service/service.selectors';
import * as ServiceActions from '../../infrastructure/store/service/service.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с категориями
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceFacade implements ServiceFacadeAbstract {
  constructor(private store: Store<ServiceFeature.ServicePartialState>) {}
}
