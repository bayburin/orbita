import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as HostFeature from '../../infrastructure/store/host/host.reducer';
import * as HostActions from '../../infrastructure/store/host/host.actions';
import * as HostSelectors from '../../infrastructure/store/host/host.selectors';
import { AuthCenterFacadeAbstract } from './auth-center.facade.abstract';

/**
 * Фасад для работы с данными из ЦА (обращения к хранилищу Host)
 */
@Injectable({
  providedIn: 'root',
})
export class AuthCenterFacade implements AuthCenterFacadeAbstract {
  loadingHost$ = this.store.select(HostSelectors.getLoading);
  loadedHost$ = this.store.select(HostSelectors.getLoaded);
  selectedHost$ = this.store.select(HostSelectors.getSelected);

  constructor(private store: Store<HostFeature.HostPartialState>) {}
}
