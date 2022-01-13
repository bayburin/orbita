import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppFacadeAbstract } from './app.facade.abstract';
import * as AppActions from '../../infrastructure/store/app/app.actions';
import * as AppFeature from '../../infrastructure/store/app/app.reducer';
import * as AppSelectors from '../../infrastructure/store/app/app.selectors';

/**
 * Фасад для общей работы с приложением (обращения к хранилищу App)
 */
@Injectable({
  providedIn: 'root',
})
export class AppFacade implements AppFacadeAbstract {
  loaded$ = this.store.select(AppSelectors.getLoaded);
  loading$ = this.store.select(AppSelectors.getLoading);
  error$ = this.store.select(AppSelectors.getError);
  serverDate$ = this.store.select(AppSelectors.getServerDate);

  constructor(private store: Store<AppFeature.AppPartialState>) {}

  init() {
    this.store.dispatch(AppActions.appInit());
  }

  detectAdBlock(value: boolean) {
    this.store.dispatch(AppActions.detectAdBlock({ adBlock: value }));
  }

  initVersionChecking() {
    setInterval(() => {
      this.store.dispatch(AppActions.loadAppVersion());
    }, 1000 * 60 * 30);
  }
}
