import { readFirst } from '@nrwl/angular/testing';
import { NxModule } from '@nrwl/angular';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { ServiceDeskFacade } from './service-desk.facade';
import { ServiceDeskApi } from './../../infrastructure/api/service-desk/service-desk.api';
import { ServiceDeskApiStub } from './../../infrastructure/api/service-desk/service-desk.api.stub';
import { SdTicket } from './../../entities/models/sd/sd-ticket.interface';
import { SdService } from './../../entities/models/sd/sd-service.interface';
import {
  SD_TICKET_FEATURE_KEY,
  State as SdTicketState,
  initialState as sdTicketInitialState,
} from './../../infrastructure/store/sd-ticket/sd-ticket.reducer';
import {
  SD_SERVICE_FEATURE_KEY,
  State as SdServiceState,
  initialState as sdServiceInitialState,
} from './../../infrastructure/store/sd-service/sd-service.reducer';
import { TICKET_SYSTEM_FEATURE_KEY, reducer } from './../../infrastructure/store/index';
import { SdTicketCacheService } from './../../infrastructure/services/sd-ticket-cache.service';
import { SdTicketCacheServiceStub } from './../../infrastructure/services/sd-ticket-cache.service.stub';
import * as SdServiceActions from '../../infrastructure/store/sd-service/sd-service.actions';
import * as SdTicketActions from '../../infrastructure/store/sd-ticket/sd-ticket.actions';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [SD_TICKET_FEATURE_KEY]: SdTicketState;
    [SD_SERVICE_FEATURE_KEY]: SdServiceState;
  };
}

describe('ServiceDeskFacade', () => {
  let facade: ServiceDeskFacade;
  let store: MockStore<TestSchema>;
  // let sdServiceStore: MockStore<TestSchema>;
  let serviceDeskApi: ServiceDeskApi;
  const createSdTicketEntity = (identity: number, name = '') =>
    (({
      identity,
      name: name || `name-${identity}`,
    } as unknown) as SdTicket);
  const createSdServiceEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as SdService);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [SD_TICKET_FEATURE_KEY]: sdTicketInitialState,
        [SD_SERVICE_FEATURE_KEY]: sdServiceInitialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ServiceDeskFacade,
          provideMockActions(() => actions$),
          provideMockStore({ initialState: state }),
          { provide: ServiceDeskApi, useClass: ServiceDeskApiStub },
        ],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(ServiceDeskFacade);
      serviceDeskApi = TestBed.inject(ServiceDeskApi);
    });

    describe('loadSdTickets$ attribute', () => {
      let querySpy: jasmine.Spy;
      const sdTickets = [createSdTicketEntity(1), createSdTicketEntity(2)];
      const sdServices = [createSdServiceEntity(3), createSdServiceEntity(4)];

      beforeEach(() => {
        querySpy = spyOn(serviceDeskApi, 'getTickets');
        spyOn(SdTicketCacheService, 'normalizeSdTickets').and.returnValue(
          SdTicketCacheServiceStub.normalizeSdRequests(sdTickets, sdServices)
        );
      });

      it('should call loadAll action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.loadSdTickets$.subscribe();
        expect(spy).toHaveBeenCalledWith(SdTicketActions.loadAll());
      });

      it('should call "getTickets" method', () => {
        facade.loadSdTickets$.subscribe();

        expect(querySpy).toHaveBeenCalled();
      });

      it('should call loadAllSuccess action if serviceDeskApi finished successfully', () => {
        querySpy.and.returnValue(of(sdTickets));
        const storeSpy = spyOn(store, 'dispatch');
        facade.loadSdTickets$.subscribe();

        expect(storeSpy.calls.allArgs()).toEqual([
          [SdTicketActions.loadAll()],
          [SdTicketActions.loadAllSuccess({ tickets: sdTickets })],
          [SdServiceActions.setAll({ services: sdServices })],
        ]);
      });

      it('should call loadAllFailure action if serviceDeskApi finished with error', () => {
        const error = { error: 'Error message' };
        querySpy.and.callFake(() => throwError(error));
        const spy = spyOn(store, 'dispatch');
        facade.loadSdTickets$.subscribe();

        expect(spy).toHaveBeenCalledWith(SdTicketActions.loadAllFailure({ error }));
      });
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(TICKET_SYSTEM_FEATURE_KEY, reducer)],
        providers: [ServiceDeskFacade, { provide: ServiceDeskApi, useClass: ServiceDeskApiStub }],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.inject(ServiceDeskFacade);
      serviceDeskApi = TestBed.inject(ServiceDeskApi);
    });

    it('should return the loaded list; and loaded flag == true and another attributes', async (done) => {
      try {
        const sdTickets = [createSdTicketEntity(1), createSdTicketEntity(2), createSdTicketEntity(3)];
        const sdServices = [createSdServiceEntity(3), createSdServiceEntity(4)];
        spyOn(serviceDeskApi, 'getTickets').and.returnValue(of(sdTickets));
        spyOn(SdTicketCacheService, 'normalizeSdTickets').and.returnValue(
          SdTicketCacheServiceStub.normalizeSdRequests(sdTickets, sdServices)
        );
        let isLoaded = await readFirst(facade.loaded$);

        expect(isLoaded).toBe(false);

        const ticketList = await readFirst(facade.sdTickets$);
        const serviceList = await readFirst(facade.sdServices$);
        isLoaded = await readFirst(facade.loaded$);

        expect(ticketList.length).toBe(3);
        expect(serviceList.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
