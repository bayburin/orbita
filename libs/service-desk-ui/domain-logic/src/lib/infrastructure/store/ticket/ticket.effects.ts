import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TicketApi } from '../../api/ticket/ticket.api';
import { TicketCacheService } from './../../services/ticket-cache.service';
import * as TicketActions from './ticket.actions';
import * as TicketFeature from './ticket.reducer';
import * as RouterSelectors from '../selectors/router.selectors';
import * as ServiceActions from '../service/service.actions';
import * as ResponsibleUserActions from '../responsible-user/responsible-user.actions';

@Injectable()
export class TicketEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<TicketFeature.TicketPartialState>,
    private ticketApi: TicketApi
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, params]) =>
        this.ticketApi.show(params.identity).pipe(
          switchMap((ticket) => {
            const data = TicketCacheService.normalizeTickets(ticket).entities;

            return [
              ResponsibleUserActions.setEntities({ entities: data.responsible_users || {} }),
              ServiceActions.setEntities({ entities: data.services }),
              TicketActions.loadSelectedSuccess({ ticket: data.tickets[ticket.id] }),
            ];
          }),
          catchError((error) => of(TicketActions.loadSelectedFailure({ error })))
        )
      )
    )
  );
}
