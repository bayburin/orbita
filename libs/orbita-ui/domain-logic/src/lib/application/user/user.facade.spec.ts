import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { readFirst } from '@nrwl/angular/testing';

import { USER_FEATURE_KEY, State, initialState, reducer } from '../../infrastructure/store/user/user.reducer';
import { reducer as indexReducer } from '../../infrastructure/store';
import {
  GROUP_FEATURE_KEY,
  State as GroupState,
  initialState as groupInitialState,
} from './../../infrastructure/store/group/group.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { UserFacade } from './user.facade';
import { User } from '../../entities/models/user.interface';
import { Group } from './../../entities/models/group.interface';
import { UserGroup } from '../../entities/view-models/user-group.interface';
import * as UserActions from '../../infrastructure/store/user/user.actions';
import * as GroupActions from '../../infrastructure/store/group/group.actions';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [USER_FEATURE_KEY]: State;
    [GROUP_FEATURE_KEY]: GroupState;
  };
}

describe('UserFacade', () => {
  let facade: UserFacade;
  let store: MockStore<TestSchema>;
  let authHelper: AuthHelper;
  const createUserEntity = (id: number, group_id: number, name = '') =>
    (({
      id,
      id_tn: id,
      fio: name || `name-${id}`,
      group_id: group_id || id,
    } as unknown) as User);
  const createGroupEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Group);
  const createUserGroupEntity = (id: number, users: User[] = []) =>
    (({
      id,
      users,
    } as unknown) as UserGroup);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [USER_FEATURE_KEY]: initialState,
        [GROUP_FEATURE_KEY]: groupInitialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserFacade,
          provideMockActions(() => actions$),
          provideMockStore({ initialState: state }),
          { provide: AuthHelper, useClass: AuthHelperStub },
        ],
      });

      store = TestBed.inject(MockStore);
      authHelper = TestBed.inject(AuthHelper);
      facade = TestBed.inject(UserFacade);
    });

    it('', () => {
      /**  */
    });
  });

  describe('used in NgModule', () => {
    let store: Store<TestSchema>;

    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(TICKET_SYSTEM_FEATURE_KEY, indexReducer)],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
        providers: [UserFacade, { provide: AuthHelper, useClass: AuthHelperStub }],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      authHelper = TestBed.inject(AuthHelper);
      facade = TestBed.inject(UserFacade);
    });

    it('userGroups$ should return users by groups', async (done) => {
      try {
        const user = { id: 1, id_tn: 2, fio: '' };
        const groups = [createGroupEntity(1)];
        const users = [createUserEntity(1, 1), createUserEntity(2, 1)];
        // const groups = createUserGroupEntity(1, users);
        spyOn(authHelper, 'getJwtPayload').and.returnValue(user);

        store.dispatch(GroupActions.setAll({ groups }));
        store.dispatch(UserActions.setAll({ users }));

        const userGroups = await readFirst(facade.userGroups$);

        expect(userGroups[0].users[0].isCurrentUser).toBe(false);
        expect(userGroups[0].users[1].isCurrentUser).toBe(true);

        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
