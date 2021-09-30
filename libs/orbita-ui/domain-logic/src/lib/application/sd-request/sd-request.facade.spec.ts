import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Action } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { of, Observable, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

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
import { SdRequestCacheService } from './../../infrastructure/services/sd-request-cache.service';
import { SdRequestCacheServiceStub } from './../../infrastructure/services/sd-request-cache.service.stub';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { NewSdRequestViewForm } from './../../entities/forms/new-sd-request-view-form.interface';
import * as helperFunction from '../../infrastructure/utils/process-sd-request-table-filters.function';
import { PrimeFilterFactory } from './../../infrastructure/factories/prime-filter.factory';
import { StreamService } from '../../infrastructure/stream/stream.service';
import { StreamServiceStub } from './../../infrastructure/stream/stream.service.stub';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [SD_REQUEST_FEATURE_KEY]: State;
  };
}

describe('SdRequestFacade', () => {
  let facade: SdRequestFacade;
  let store: MockStore<TestSchema>;
  const createSdRequestEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      comments: [],
      works: [],
    } as unknown as SdRequest);

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
          { provide: AuthHelper, useClass: AuthHelperStub },
          { provide: StreamService, useClass: StreamServiceStub },
          MessageService,
        ],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(SdRequestFacade);
    });

    describe('loadSdRequestsTable()', () => {
      it('chould process event data', () => {
        const spy = jest.spyOn(helperFunction, 'processSdRequestTableFilters');
        const filters = PrimeFilterFactory.createFilter('id_tn', 123);

        facade.loadSdRequestsTable({ filters });

        expect(spy).toHaveBeenCalledWith(filters);
      });

      it('should call loadSdRequests action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.loadSdRequestsTable({});

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAll({ data: { filters: {} } }));
      });
    });

    describe('loadFiltered()', () => {
      it('should call loadSdRequests action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.loadFiltered({ rows: 10 });

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAll({ data: { rows: 10 } }));
      });
    });

    describe('loadSelectedSdRequest()', () => {
      it('should call LoadSelected action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.loadSelectedSdRequest();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.loadSelected());
      });
    });

    describe('clearSelected()', () => {
      it('should call LoadSelected action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.clearSelected();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.clearSelected());
      });
    });

    describe('toggleEditMode()', () => {
      it('should call toggleEditMode action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.toggleEditMode();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.toggleSelectedEditMode());
      });
    });

    describe('changeForm()', () => {
      it('should call changeForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');
        const data = { id: 123 } as SdRequestViewForm;

        facade.changeForm(data);

        expect(spy).toHaveBeenCalledWith(SdRequestActions.changeForm({ entity: data }));
      });
    });

    describe('updateForm()', () => {
      it('should call updateForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.updateForm();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.saveUpdateForm());
      });
    });

    describe('clearAll()', () => {
      it('should call clearAll action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.clearAll();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.clearAll());
      });
    });

    describe('initNewForm()', () => {
      it('should call initNewForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.initNewForm();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.initNewForm());
      });
    });

    describe('changeNewForm()', () => {
      it('should call changeNewForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');
        const data = { description: 'test' } as NewSdRequestViewForm;

        facade.changeNewForm(data);

        expect(spy).toHaveBeenCalledWith(SdRequestActions.changeNewForm({ entity: data }));
      });
    });

    describe('createForm()', () => {
      it('should call createForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.createForm();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.saveNewForm());
      });
    });

    describe('closeModalAfterCreateSdRequest()', () => {
      it('should call closeModalAfterCreateSdRequest action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.closeModalAfterCreateSdRequest();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.closeModalAfterCreateNewForm());
      });
    });

    describe('clearCreatedForm()', () => {
      it('should call clearNewForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.clearCreatedForm();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.clearNewForm());
      });
    });

    describe('reinitUpdateForm()', () => {
      it('should call reinitUpdateForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.reinitUpdateForm();

        expect(spy).toHaveBeenCalledWith(SdRequestActions.reinitUpdateForm());
      });
    });
  });

  // describe('used in NgModule', () => {
  //   beforeEach(() => {
  //     @NgModule({
  //       imports: [
  //         StoreModule.forFeature(TICKET_SYSTEM_FEATURE_KEY, reducer),
  //         EffectsModule.forFeature([SdRequestEffects]),
  //       ],
  //       providers: [
  //         SdRequestFacade,
  //         { provide: SdRequestApi, useClass: SdRequestApiStub },
  //         { provide: AuthHelper, useClass: AuthHelperStub },
  //       ],
  //     })
  //     class CustomFeatureModule {}

  //     @NgModule({
  //       imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
  //       providers: [MessageService],
  //     })
  //     class RootModule {}
  //     TestBed.configureTestingModule({ imports: [RootModule] });

  //     facade = TestBed.inject(SdRequestFacade);
  //     sdRequestApi = TestBed.inject(SdRequestApi);
  //   });

  //   it('all$ should return the loaded list; and loaded flag == true and another attributes', async (done) => {
  //     try {
  //       const SdRequestsServerData = new SdRequestsServerDataBuilder()
  //         .sd_requests([createSdRequestEntity(1), createSdRequestEntity(2)])
  //         .current_page(2)
  //         .total_count(6)
  //         .build();
  //       jest.spyOn(sdRequestApi, 'query').mockReturnValue(of(SdRequestsServerData));
  //       jest
  //         .spyOn(SdRequestCacheService, 'normalizeSdRequests')
  //         .mockReturnValue(SdRequestCacheServiceStub.normalizeSdRequests(SdRequestsServerData.sd_requests));
  //       let isLoaded = await readFirst(facade.loaded$);

  //       expect(isLoaded).toBe(false);

  //       // let page = await readFirst(facade.page$);
  //       let totalCount = await readFirst(facade.totalCount$);
  //       const list = await readFirst(facade.all$);
  //       isLoaded = await readFirst(facade.loaded$);

  //       // expect(page).toEqual(1);
  //       expect(totalCount).toEqual(0);
  //       expect(list.length).toBe(2);
  //       expect(isLoaded).toBe(true);

  //       // page = await readFirst(facade.page$);
  //       totalCount = await readFirst(facade.totalCount$);

  //       // expect(page).toEqual(1);
  //       expect(totalCount).toEqual(6);

  //       done();
  //     } catch (err) {
  //       done.fail(err);
  //     }
  //   });

  //   it('setTableMetadata() should change firstRowIndex, perPage and all$ data', async (done) => {
  //     try {
  //       const firstList = new SdRequestsServerDataBuilder()
  //         .sd_requests([createSdRequestEntity(1), createSdRequestEntity(2)])
  //         .build();
  //       const secondList = new SdRequestsServerDataBuilder()
  //         .sd_requests([createSdRequestEntity(1), createSdRequestEntity(2), createSdRequestEntity(3)])
  //         .current_page(123)
  //         .build();
  //       jest.spyOn(sdRequestApi, 'query').mockReturnValueOnce(of(firstList)).mockReturnValueOnce(of(secondList));
  //       jest
  //         .spyOn(SdRequestCacheService, 'normalizeSdRequests')
  //         .mockReturnValueOnce(SdRequestCacheServiceStub.normalizeSdRequests(firstList.sd_requests))
  //         .mockReturnValueOnce(SdRequestCacheServiceStub.normalizeSdRequests(secondList.sd_requests));
  //       let firstRowIndex = await readFirst(facade.firstRowIndex$);
  //       let list = await readFirst(facade.all$);
  //       let perPage = await readFirst(facade.perPage$);

  //       expect(firstRowIndex).toEqual(0);
  //       expect(perPage).toEqual(25);
  //       expect(list.length).toEqual(2);

  //       facade.setTableMetadata({ first: 4, rows: 2 });

  //       firstRowIndex = await readFirst(facade.firstRowIndex$);
  //       perPage = await readFirst(facade.perPage$);
  //       perPage = await readFirst(facade.perPage$);
  //       list = await readFirst(facade.all$);

  //       expect(firstRowIndex).toEqual(4);
  //       expect(perPage).toEqual(2);
  //       expect(list.length).toEqual(3);

  //       done();
  //     } catch (err) {
  //       done.fail(err);
  //     }
  //   });
  // });
});
