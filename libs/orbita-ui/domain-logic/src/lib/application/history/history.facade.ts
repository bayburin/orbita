import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as HistoryFeature from '../../infrastructure/store/history/history.reducer';
import * as HistoryActions from '../../infrastructure/store/history/history.actions';
import { History } from '../../entities/models/history.interface';
import { HistoryFacadeAbstract } from './history.facade.abstract';

/**
 * Фасад для работы с историей заявка (обращения к хранилищу History)
 */
@Injectable({
  providedIn: 'root',
})
export class HistoryFacade implements HistoryFacadeAbstract {
  constructor(private store: Store<HistoryFeature.HistoryPartialState>) {}

  setHistories(histories: History[]) {
    this.store.dispatch(HistoryActions.setAll({ histories }));
  }
}
