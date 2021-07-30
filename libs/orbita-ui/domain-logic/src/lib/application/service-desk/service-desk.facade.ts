import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, tap, switchMap, catchError, startWith, share } from 'rxjs/operators';
import { muteFirst } from '@orbita/orbita-ui/utils';

import { ServiceDeskFacadeAbstract } from './service-desk.facade.abstract';
import * as SdServiceActions from '../../infrastructure/store/sd-service/sd-service.actions';
import * as SdServiceFeature from '../../infrastructure/store/sd-service/sd-service.reducer';
import * as SdServiceSelectors from '../../infrastructure/store/sd-service/sd-service.selectors';
import * as SdTicketActions from '../../infrastructure/store/sd-ticket/sd-ticket.actions';
import * as SdTicketFeature from '../../infrastructure/store/sd-ticket/sd-ticket.reducer';
import * as SdTicketSelectors from '../../infrastructure/store/sd-ticket/sd-ticket.selectors';
import * as ServiceDeskViewModelSelectors from '../../infrastructure/store/selectors/service-desk-view-model.selectors';
import { ServiceDeskApi } from './../../infrastructure/api/service-desk/service-desk.api';
import { SdTicketCacheService } from './../../infrastructure/services/sd-ticket-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceDeskFacade implements ServiceDeskFacadeAbstract {
  loading$ = this.sdTicketStore.select(SdTicketSelectors.getLoading);
  loaded$ = this.sdTicketStore.select(SdTicketSelectors.getLoaded);
  loadSdTickets$ = this.sdTicketStore.select(SdTicketSelectors.getNeedTickets).pipe(
    filter((needTickets) => needTickets),
    tap(() => this.sdTicketStore.dispatch(SdTicketActions.loadAll())),
    switchMap(() =>
      this.serviceDeskApi.getTickets().pipe(
        tap((data) => {
          const normalizeData = SdTicketCacheService.normalizeSdTickets(data).entities;

          this.sdTicketStore.dispatch(
            SdTicketActions.loadAllSuccess({ tickets: Object.values(normalizeData.tickets || []) })
          );
          this.sdServiceStore.dispatch(
            SdServiceActions.setAll({ services: Object.values(normalizeData.services || []) })
          );
        }),
        catchError((error) => of(this.sdTicketStore.dispatch(SdTicketActions.loadAllFailure({ error }))))
      )
    ),
    share()
  );

  sdTickets$ = muteFirst(
    this.loadSdTickets$.pipe(startWith(null)),
    this.sdTicketStore.select(SdTicketSelectors.getAll)
  );
  sdServices$ = muteFirst(
    this.loadSdTickets$.pipe(startWith(null)),
    this.sdServiceStore.select(SdServiceSelectors.getAll)
  );
  allFreeApplicationsViewModel$ = muteFirst(
    this.loadSdTickets$.pipe(startWith(null)),
    this.sdTicketStore.select(ServiceDeskViewModelSelectors.getAllFreeApplicationsViewModel)
  );

  constructor(
    private sdTicketStore: Store<SdTicketFeature.SdTicketPartialState>,
    private sdServiceStore: Store<SdServiceFeature.SdServicePartialState>,
    private serviceDeskApi: ServiceDeskApi
  ) {}
}
