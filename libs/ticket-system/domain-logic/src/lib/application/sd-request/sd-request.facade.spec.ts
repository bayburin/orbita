
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Action } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { of, Observable, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { SdRequest } from '../../entities/sd-request.interface';
import { SdRequestEffects } from '../../infrastructure/store/sd-request/sd-request.effects';
import { SdRequestFacade } from './sd-request.facade';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { SdRequestApiStub } from './../../infrastructure/api/sd-request/sd-request.api.stub';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import { SD_REQUEST_FEATURE_KEY, State, initialState } from '../../infrastructure/store/sd-request/sd-request.reducer';
import { TICKET_SYSTEM_FEATURE_KEY, reducer } from '../../infrastructure/store/index';
import { SdRequestQueueBuilder } from './../../infrastructure/builders/sd-request-queue.builder';
import { SdRequestQueue } from '../../entities/sd-request-queue.interface';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [SD_REQUEST_FEATURE_KEY]: State;
  }
}

describe('SdRequestFacade', () => {
  let facade: SdRequestFacade;
  let store: MockStore<TestSchema>;
  let sdRequestApi: SdRequestApi;
  const createSdRequestEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as SdRequest);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [SD_REQUEST_FEATURE_KEY]: initialState
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          SdRequestFacade,
          provideMockActions(() => actions$),
          provideMockStore({ initialState: state }),
          { provide: SdRequestApi, useClass: SdRequestApiStub }
        ]
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(SdRequestFacade);
      sdRequestApi = TestBed.inject(SdRequestApi);
    });

    describe('loadSdRequests$ attribute', () => {
      let querySpy: jasmine.Spy;
      let sdRequestQueue: SdRequestQueue;

      beforeEach(() => {
        sdRequestQueue = new SdRequestQueueBuilder().build();
        querySpy = spyOn(sdRequestApi, 'query')
      })

      it('should call loadAll action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.loadSdRequests$.subscribe();
        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAll());
      });

      it('should call "query" method with attributes from store', () => {
        store.overrideSelector(SdRequestSelectors.getPage, 2);
        store.overrideSelector(SdRequestSelectors.getMaxSize, 10);
        facade.loadSdRequests$.subscribe();

        expect(querySpy).toHaveBeenCalledWith(2, 10);
      });

      it('should call loadAllSuccess action if sdRequestApi finished successfully', () => {
        querySpy.and.returnValue(of(sdRequestQueue));
        const spy = spyOn(store, 'dispatch');
        facade.loadSdRequests$.subscribe();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAllSuccess({ sdRequestQueue }));
      });

      it('should call loadAllSuccess action if sdRequestApi finished successfully', () => {
        const error = { error: 'Error message' }
        querySpy.and.callFake(() => throwError(error));
        const spy = spyOn(store, 'dispatch');
        facade.loadSdRequests$.subscribe();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAllFailure({ error }));
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
        providers: [
          SdRequestFacade,
          { provide: SdRequestApi, useClass: SdRequestApiStub }
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.inject(SdRequestFacade);
      sdRequestApi = TestBed.inject(SdRequestApi);
    });

    it('all$ should return the loaded list; and loaded flag == true and another attributes', async (done) => {
      try {
        const sdRequestQueue = new SdRequestQueueBuilder()
          .sd_requests([createSdRequestEntity('AAA'), createSdRequestEntity('BBB')])
          .current_page(2)
          .total_count(6)
          .build();
        spyOn(sdRequestApi, 'query').and.returnValue(of(sdRequestQueue));
        let isLoaded = await readFirst(facade.loaded$);

        expect(isLoaded).toBe(false);

        let page = await readFirst(facade.page$);
        let totalCount = await readFirst(facade.totalCount$);
        const list = await readFirst(facade.all$);
        isLoaded = await readFirst(facade.loaded$);

        expect(page).toEqual(1);
        expect(totalCount).toEqual(0);
        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        page = await readFirst(facade.page$);
        totalCount = await readFirst(facade.totalCount$);

        expect(page).toEqual(1);
        expect(totalCount).toEqual(6);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('setPage() should change page, and all$ data', async (done) => {
      try {
        spyOn(sdRequestApi, 'query').and.returnValues(
          of(new SdRequestQueueBuilder().sd_requests([createSdRequestEntity('AAA'), createSdRequestEntity('BBB')]).build()),
          of(new SdRequestQueueBuilder().sd_requests([createSdRequestEntity('AAA'), createSdRequestEntity('BBB'), createSdRequestEntity('CCC')]).current_page(123).build()),
        );
        let page = await readFirst(facade.page$);
        let list = await readFirst(facade.all$);

        expect(page).toEqual(1);
        expect(list.length).toEqual(2);

        facade.setPage(3);

        page = await readFirst(facade.page$);
        list = await readFirst(facade.all$);

        expect(page).toEqual(3);
        expect(list.length).toEqual(3);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
