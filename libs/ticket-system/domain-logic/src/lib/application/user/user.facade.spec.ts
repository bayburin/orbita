
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Action } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { of, Observable, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { User } from '../../entities/models/user.interface';
import { UserEffects } from '../../infrastructure/store/user/user.effects';
import { UserFacade } from './user.facade';
import { UserApi } from './../../infrastructure/api/user/user.api';
import { UserApiStub } from './../../infrastructure/api/user/user.api.stub';
import * as UserActions from '../../infrastructure/store/user/user.actions';
import { USER_FEATURE_KEY, State, initialState } from '../../infrastructure/store/user/user.reducer';
import { TICKET_SYSTEM_FEATURE_KEY, reducer } from '../../infrastructure/store/index';
import { UserQueueBuilder } from './../../infrastructure/builders/user-queue.builder';
import { UserQueue } from '../../entities/user-queue.interface';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [USER_FEATURE_KEY]: State;
  }
}

describe('UserFacade', () => {
  let facade: UserFacade;
  let store: MockStore<TestSchema>;
  let userApi: UserApi;
  const createUserEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as User);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [USER_FEATURE_KEY]: initialState
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserFacade,
          provideMockActions(() => actions$),
          provideMockStore({ initialState: state }),
          { provide: UserApi, useClass: UserApiStub }
        ]
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(UserFacade);
      userApi = TestBed.inject(UserApi);
    });

    describe('loadUsers$ attribute', () => {
      let querySpy: jasmine.Spy;
      let userQueue: UserQueue;

      beforeEach(() => {
        userQueue = new UserQueueBuilder().build();
        querySpy = spyOn(userApi, 'query')
      })

      it('should call loadAll action', () => {
        const spy = spyOn(store, 'dispatch');

        facade.loadUsers$.subscribe();

        expect(spy).toHaveBeenCalledWith(UserActions.loadAll());
      });

      it('should call loadAllSuccess action if userApi finished successfully', () => {
        querySpy.and.returnValue(of(userQueue));
        const spy = spyOn(store, 'dispatch');

        facade.loadUsers$.subscribe();

        expect(spy).toHaveBeenCalledWith(UserActions.loadAllSuccess({ users: userQueue.users }));
      });

      it('should call loadAllSuccess action if userApi finished successfully', () => {
        const error = { error: 'Error message' }
        querySpy.and.callFake(() => throwError(error));
        const spy = spyOn(store, 'dispatch');

        facade.loadUsers$.subscribe();

        expect(spy).toHaveBeenCalledWith(UserActions.loadAllFailure({ error }));
      });
    });

    describe('init()', () => {
      it('should subscribe to loadUsers$ attribute', () => {
        const spy = spyOn(store, 'dispatch');

        facade.init();

        expect(spy).toHaveBeenCalledWith(UserActions.loadAll());
      });
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TICKET_SYSTEM_FEATURE_KEY, reducer),
          EffectsModule.forFeature([UserEffects]),
        ],
        providers: [
          UserFacade,
          { provide: UserApi, useClass: UserApiStub }
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

      facade = TestBed.inject(UserFacade);
      userApi = TestBed.inject(UserApi);
    });

    it('all$ should return the loaded list; and loaded flag == true and another attributes', async (done) => {
      try {
        const userQueue = new UserQueueBuilder()
          .users([createUserEntity('AAA'), createUserEntity('BBB')])
          .build();
        spyOn(userApi, 'query').and.returnValue(of(userQueue));
        let isLoaded = await readFirst(facade.loaded$);

        expect(isLoaded).toBe(false);

        const list = await readFirst(facade.all$);
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
