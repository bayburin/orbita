import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as SdTicketActions from './sd-ticket.actions';
import * as SdTicketFeature from './sd-ticket.reducer';
import * as SdTicketSelectors from './sd-ticket.selectors';
import * as SdServiceActions from '../sd-service/sd-service.actions';
import { ServiceDeskApi } from './../../api/service-desk/service-desk.api';
import { SdTicketCacheService } from './../../services/sd-ticket-cache.service';

@Injectable()
export class SdTicketEffects {
  constructor(
    private actions$: Actions,
    private store: Store<SdTicketFeature.SdTicketPartialState>,
    private serviceDeskApi: ServiceDeskApi
  ) {}

  selectTicketIdentity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdTicketActions.selectTicketIdentity),
      withLatestFrom(this.store.select(SdTicketSelectors.getSelected)),
      filter(([_action, sdTicket]) => !sdTicket),
      map(() => SdTicketActions.loadTicket())
    )
  );

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SdTicketActions.loadTicket),
      withLatestFrom(this.store.select(SdTicketSelectors.getSelectedIdentity)),
      switchMap(([_action, identity]) => {
        return this.serviceDeskApi.getTicket(identity).pipe(
          switchMap((ticket) => {
            const normalizeData = SdTicketCacheService.normalizeSdTicket(ticket).entities;

            return [
              SdTicketActions.loadTicketSuccess({ ticket: normalizeData.tickets[ticket.id] }),
              SdServiceActions.setOne({ service: normalizeData.services[ticket.service_id] }),
            ];
          }),
          catchError((error) => of(SdTicketActions.loadAllFailure({ error })))
        );
      })
    )
  );
}
