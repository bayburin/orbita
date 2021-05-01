import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { SdRequest } from '../entities/sd-request.interface';
import { SdRequestEffects } from '../infrastructure/store/sd-request/sd-request.effects';
import { SdRequestFacade } from './sd-request.facade';
import { SdRequestApi } from './../infrastructure/api/sd-request/sd-request.api';
import { SdRequestApiStub } from './../infrastructure/api/sd-request/sd-request.api.stub';
import * as SdRequestActions from '../infrastructure/store/sd-request/sd-request.actions';
import { SD_REQUEST_FEATURE_KEY, State, reducer } from '../infrastructure/store/sd-request/sd-request.reducer';

interface TestSchema {
  sdRequest: State;
}

describe('SdRequestFacade', () => {
  let facade: SdRequestFacade;
  let store: Store<TestSchema>;
  const createSdRequestEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as SdRequest);

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SD_REQUEST_FEATURE_KEY, reducer),
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

      store = TestBed.inject(Store);
      facade = TestBed.inject(SdRequestFacade);
    });

    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.all$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.all$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('all$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.all$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          SdRequestActions.loadAllSuccess({
            sdRequests: [
              createSdRequestEntity('AAA'),
              createSdRequestEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.all$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
