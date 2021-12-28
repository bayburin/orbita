import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TicketFacadeAbstract } from './ticket.facade.abstract';
import * as TicketFeature from '../../infrastructure/store/ticket/ticket.reducer';
import * as TicketSelectors from '../../infrastructure/store/ticket/ticket.selectors';
import * as TicketActions from '../../infrastructure/store/ticket/ticket.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с тикетами
 */
@Injectable({
  providedIn: 'root',
})
export class TicketFacade implements TicketFacadeAbstract {
  ticket$ = this.store.select(VMSelectors.getSelectedTicketOverviewVM);
  loaded$ = this.store.select(TicketSelectors.getLoaded);

  constructor(private store: Store<TicketFeature.TicketPartialState>) {}

  loadSelected() {
    this.store.dispatch(TicketActions.loadSelected());
  }
}
