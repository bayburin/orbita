import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppFacadeAbstract } from './app.facade.abstract';
import * as AppActions from '../../infrastructure/store/app/app.actions';
import * as AppFeature from '../../infrastructure/store/app/app.reducer';

/**
 * Фасад для общей работы с приложением (обращения к стору App)
 */
@Injectable({
  providedIn: 'root'
})
export class AppFacade implements AppFacadeAbstract {
  constructor(private store: Store<AppFeature.AppPartialState>) {}

  init() {
    this.store.dispatch(AppActions.init());
  }
}
