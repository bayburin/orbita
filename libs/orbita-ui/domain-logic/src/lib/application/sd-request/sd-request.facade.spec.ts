import { tap } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Action } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { of, Observable, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { SdRequest } from '../../entities/models/sd-request.interface';
import { SdRequestEffects } from '../../infrastructure/store/sd-request/sd-request.effects';
import { SdRequestFacade } from './sd-request.facade';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { SdRequestApiStub } from './../../infrastructure/api/sd-request/sd-request.api.stub';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import { SD_REQUEST_FEATURE_KEY, State, initialState } from '../../infrastructure/store/sd-request/sd-request.reducer';
import { TICKET_SYSTEM_FEATURE_KEY, reducer } from '../../infrastructure/store/index';
import { SdRequestsServerDataBuilder } from './../../infrastructure/builders/sd-request-server-data.builder';
import { SdRequestsServerData } from '../../entities/server-data/sd-request-server-data.interface';
import { MessageFacade } from './../message/message.facade';
import { MessageFacadeStub } from './../message/message.facade.stub';
import { WorkFacade } from './../work/work.facade';
import { WorkFacadeStub } from './../work/work.facade.stub';
import { HistoryFacade } from './../history/history.facade';
import { HistoryFacadeStub } from './../history/history.facade.stub';
import { WorkerFacade } from './../worker/worker.facade';
import { WorkerFacadeStub } from './../worker/worker.facade.stub';
import { SdRequestCacheService } from './../../infrastructure/services/sd-request-cache.service';
import { SdRequestCacheServiceStub } from './../../infrastructure/services/sd-request-cache.service.stub';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [SD_REQUEST_FEATURE_KEY]: State;
  };
}

describe('SdRequestFacade', () => {
  let facade: SdRequestFacade;
  let store: MockStore<TestSchema>;
  let sdRequestApi: SdRequestApi;
  const createSdRequestEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
      comments: [],
      works: [],
    } as unknown) as SdRequest);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [SD_REQUEST_FEATURE_KEY]: initialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          SdRequestFacade,
          provideMockActions(() => actions$),
          provideMockStore({ initialState: state }),
          { provide: SdRequestApi, useClass: SdRequestApiStub },
          { provide: MessageFacade, useClass: MessageFacadeStub },
          { provide: WorkFacade, useClass: WorkFacadeStub },
          { provide: HistoryFacade, useClass: HistoryFacadeStub },
          { provide: WorkerFacade, useClass: WorkerFacadeStub },
        ],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(SdRequestFacade);
      sdRequestApi = TestBed.inject(SdRequestApi);
    });

    describe('loadSdRequests$ attribute', () => {
      let querySpy: jasmine.Spy;
      let sdRequestsServerData: SdRequestsServerData;

      beforeEach(() => {
        querySpy = spyOn(sdRequestApi, 'query');
        sdRequestsServerData = new SdRequestsServerDataBuilder().build();
        spyOn(SdRequestCacheService, 'normalizeSdRequests').and.returnValue(
          SdRequestCacheServiceStub.normalizeSdRequests()
        );
      });

      it('should call loadAll action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.loadSdRequests$.subscribe();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAll());
      });

      it('should call "query" method with attributes from store', () => {
        const filter = { id: { value: '123' } };
        store.overrideSelector(SdRequestSelectors.getPage, 2);
        store.overrideSelector(SdRequestSelectors.getPerPage, 10);
        store.overrideSelector(SdRequestSelectors.getFilters, filter);

        facade.loadSdRequests$.subscribe();

        expect(querySpy).toHaveBeenCalledWith(2, 10, filter);
      });

      describe('when sdRequestApi finished successfully', () => {
        beforeEach(() => {
          querySpy.and.returnValue(of(sdRequestsServerData));
        });

        it('should call loadAllSuccess action', () => {
          const storeSpy = spyOn(store, 'dispatch');

          facade.loadSdRequests$.subscribe();

          expect(storeSpy).toHaveBeenCalledWith(
            SdRequestActions.loadAllSuccess({
              sdRequests: sdRequestsServerData.sd_requests,
              meta: sdRequestsServerData.meta,
            })
          );
        });

        it('should call replaceAllMessages() method from MessageFacade', () => {
          const messageFacade = TestBed.inject(MessageFacade);
          spyOn(messageFacade, 'replaceAllMessages');

          facade.loadSdRequests$.subscribe();

          expect(messageFacade.replaceAllMessages).toHaveBeenCalled();
        });

        it('should call replaceAllWorks() method from WorkFacade', () => {
          const workFacade = TestBed.inject(WorkFacade);
          spyOn(workFacade, 'replaceAllWorks');

          facade.loadSdRequests$.subscribe();

          expect(workFacade.replaceAllWorks).toHaveBeenCalled();
        });

        it('should call replaceAllHistories() method from HistoryFacade', () => {
          const historyFacade = TestBed.inject(HistoryFacade);
          spyOn(historyFacade, 'replaceAllHistories');

          facade.loadSdRequests$.subscribe();

          expect(historyFacade.replaceAllHistories).toHaveBeenCalled();
        });

        it('should call replaceAllWorkers() method from WorkerFacade', () => {
          const workerFacade = TestBed.inject(WorkerFacade);
          spyOn(workerFacade, 'replaceAllWorkers');

          facade.loadSdRequests$.subscribe();

          expect(workerFacade.replaceAllWorkers).toHaveBeenCalled();
        });
      });

      it('should call loadAllFailure action if sdRequestApi finished with error', () => {
        const error = { error: 'Error message' };
        querySpy.and.callFake(() => throwError(error));
        const spy = spyOn(store, 'dispatch');

        facade.loadSdRequests$.subscribe();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAllFailure({ error }));
      });
    });

    // describe('loadSelected$ attribute', () => {
    //   let showSpy: jasmine.Spy;
    //   let sdRequestServerData: SdRequestServerData;

    //   beforeEach(() => {
    //     showSpy = spyOn(sdRequestApi, 'show');
    //     sdRequestServerData = { sd_request: createSdRequestEntity(11) };
    //     store.overrideSelector(RouterSelector.selectRouteParams, { id: 1 });
    //     spyOn(SdRequestCacheService, 'normalizeSdRequest').and.returnValue(
    //       SdRequestCacheServiceStub.normalizeSdRequest(sdRequestServerData.sd_request)
    //     );
    //   });

    //   it('should call loadAll action', () => {
    //     const spy = spyOn(store, 'dispatch');

    //     facade.loadSelected$.subscribe();

    //     expect(spy).toHaveBeenCalledWith(SdRequestActions.loadSelected());
    //   });

    //   it('should call "show" method with attributes from store', () => {
    //     facade.loadSelected$.subscribe();

    //     expect(showSpy).toHaveBeenCalledWith(1);
    //   });

    //   describe('when sdRequestApi finished successfully', () => {
    //     beforeEach(() => {
    //       showSpy.and.returnValue(of(sdRequestServerData));
    //     });

    //     // it('should call loadAllSuccess action', () => {
    //     //   const storeSpy = spyOn(store, 'dispatch');

    //     //   facade.loadSelected$.subscribe();

    //     //   expect(storeSpy).toHaveBeenCalledWith(
    //     //     SdRequestActions.loadSelectedSuccess({ sdRequest: sdRequestServerData.sd_request })
    //     //   );
    //     // });

    //     it('should call setMessages() method from MessageFacade', () => {
    //       const messageFacade = TestBed.inject(MessageFacade);
    //       spyOn(messageFacade, 'setMessages');

    //       facade.loadSelected$.subscribe();

    //       expect(messageFacade.setMessages).toHaveBeenCalled();
    //     });

    //     it('should call setWorks() method from MessageFacade', () => {
    //       const workFacade = TestBed.inject(WorkFacade);
    //       spyOn(workFacade, 'setWorks');

    //       facade.loadSelected$.subscribe();

    //       expect(workFacade.setWorks).toHaveBeenCalled();
    //     });

    //     it('should call setHistories() method from MessageFacade', () => {
    //       const historyFacade = TestBed.inject(HistoryFacade);
    //       spyOn(historyFacade, 'setHistories');

    //       facade.loadSelected$.subscribe();

    //       expect(historyFacade.setHistories).toHaveBeenCalled();
    //     });

    //     it('should call setWorkers() method from MessageFacade', () => {
    //       const workerFacade = TestBed.inject(WorkerFacade);
    //       spyOn(workerFacade, 'setWorkers');

    //       facade.loadSelected$.subscribe();

    //       expect(workerFacade.setWorkers).toHaveBeenCalled();
    //     });
    //   });

    //   it('should call loadSelectedFailure action if sdRequestApi finished with error', () => {
    //     const error = { error: 'Error message' };
    //     showSpy.and.callFake(() => throwError(error));
    //     const spy = spyOn(store, 'dispatch');

    //     facade.loadSelected$.subscribe();

    //     expect(spy).toHaveBeenCalledWith(SdRequestActions.loadSelectedFailure({ error }));
    //   });
    // });

    describe('setTableMetadata()', () => {
      it('should call ReloadEntities action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.setTableMetadata({});

        expect(spy).toHaveBeenCalledWith(SdRequestActions.SetTableMetadata({ data: {} }));
      });
    });

    describe('reloadTableData()', () => {
      it('should call ReloadEntities action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.reloadTableData();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.ReloadEntities());
      });
    });

    describe('loadSelectedSdRequest()', () => {
      it('should call LoadSelected action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.loadSelectedSdRequest();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadSelected());
      });
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TICKET_SYSTEM_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SdRequestEffects]),
        ],
        providers: [SdRequestFacade, { provide: SdRequestApi, useClass: SdRequestApiStub }],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
        providers: [
          { provide: MessageFacade, useClass: MessageFacadeStub },
          { provide: WorkFacade, useClass: WorkFacadeStub },
          { provide: HistoryFacade, useClass: HistoryFacadeStub },
          { provide: WorkerFacade, useClass: WorkerFacadeStub },
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.inject(SdRequestFacade);
      sdRequestApi = TestBed.inject(SdRequestApi);
    });

    it('all$ should return the loaded list; and loaded flag == true and another attributes', async (done) => {
      try {
        const SdRequestsServerData = new SdRequestsServerDataBuilder()
          .sd_requests([createSdRequestEntity(1), createSdRequestEntity(2)])
          .current_page(2)
          .total_count(6)
          .build();
        spyOn(sdRequestApi, 'query').and.returnValue(of(SdRequestsServerData));
        spyOn(SdRequestCacheService, 'normalizeSdRequests').and.returnValue(
          SdRequestCacheServiceStub.normalizeSdRequests(SdRequestsServerData.sd_requests)
        );
        let isLoaded = await readFirst(facade.loaded$);

        expect(isLoaded).toBe(false);

        // let page = await readFirst(facade.page$);
        let totalCount = await readFirst(facade.totalCount$);
        const list = await readFirst(facade.all$);
        isLoaded = await readFirst(facade.loaded$);

        // expect(page).toEqual(1);
        expect(totalCount).toEqual(0);
        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        // page = await readFirst(facade.page$);
        totalCount = await readFirst(facade.totalCount$);

        // expect(page).toEqual(1);
        expect(totalCount).toEqual(6);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('setTableMetadata() should change firstRowIndex, perPage and all$ data', async (done) => {
      try {
        const firstList = new SdRequestsServerDataBuilder()
          .sd_requests([createSdRequestEntity(1), createSdRequestEntity(2)])
          .build();
        const secondList = new SdRequestsServerDataBuilder()
          .sd_requests([createSdRequestEntity(1), createSdRequestEntity(2), createSdRequestEntity(3)])
          .current_page(123)
          .build();
        spyOn(sdRequestApi, 'query').and.returnValues(of(firstList), of(secondList));
        spyOn(SdRequestCacheService, 'normalizeSdRequests').and.returnValues(
          SdRequestCacheServiceStub.normalizeSdRequests(firstList.sd_requests),
          SdRequestCacheServiceStub.normalizeSdRequests(secondList.sd_requests)
        );
        let firstRowIndex = await readFirst(facade.firstRowIndex$);
        let list = await readFirst(facade.all$);
        let perPage = await readFirst(facade.perPage$);

        expect(firstRowIndex).toEqual(0);
        expect(perPage).toEqual(25);
        expect(list.length).toEqual(2);

        facade.setTableMetadata({ first: 4, rows: 2 });

        firstRowIndex = await readFirst(facade.firstRowIndex$);
        perPage = await readFirst(facade.perPage$);
        perPage = await readFirst(facade.perPage$);
        list = await readFirst(facade.all$);

        expect(firstRowIndex).toEqual(4);
        expect(perPage).toEqual(2);
        expect(list.length).toEqual(3);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
