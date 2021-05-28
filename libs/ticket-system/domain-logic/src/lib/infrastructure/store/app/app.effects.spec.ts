
// import { TestBed, async } from '@angular/core/testing';
// import { Observable, of, throwError } from 'rxjs';
// import { hot } from '@nrwl/angular/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { NxModule, DataPersistence } from '@nrwl/angular';

// import { AppEffects } from './app.effects';
// import * as AppActions from './app.actions';
// import * as UserActions from '../user/user.actions';
// import * as GroupActions from '../group/group.actions';
// import { Init } from './../../../entities/server-data/init.interface';
// import { AppApi } from './../../api/app/app.api';
// import { AppApiStub } from './../../api/app/app.api.stub';
// import { TICKET_SYSTEM_FEATURE_KEY } from './../index';
// import { APP_FEATURE_KEY, initialState, State } from './app.reducer';
// import { Group } from './../../../entities/models/group.interface';
// import { User } from './../../../entities/models/user.interface';

// describe('AppEffects', () => {
//   let actions$: Observable<any>;
//   let effects: AppEffects;
//   let appApi: AppApi;
//   const state = {
//     [TICKET_SYSTEM_FEATURE_KEY]: {
//       [APP_FEATURE_KEY]: initialState
//     }
//   }
//   let store: MockStore<State>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         AppEffects,
//         DataPersistence,
//         provideMockActions(() => actions$),
//         provideMockStore({ initialState: state }),
//         { provide: AppApi, useClass: AppApiStub }
//       ],
//     });

//     store = TestBed.inject(MockStore);
//     effects = TestBed.inject(AppEffects);
//     appApi = TestBed.inject(AppApi);
//   });

//   describe('init$', () => {
//     // it('should work', () => {
//     //   actions$ = hot('-a-|', { a: AppActions.init() });
//     //   const expected = hot('-a-|', { a: AppActions.loadAppSuccess() });

//     //   expect(effects.init$).toBeObservable(expected);
//     // });

//     // it('should call another actions', done => {
//     //   const initData = {
//     //     users: [{ id: 1 }] as User[],
//     //     groups: [{ id: 2 }] as Group[]
//     //   }
//     //   spyOn(appApi, 'init').and.returnValue(of(initData));
//     //   actions$ = of(AppActions.init);
//     //   const spy = spyOn(store, 'dispatch');

//     //   effects.init$.subscribe(() => {
//     //     expect(spy).toHaveBeenCalledWith(AppActions.loadAppSuccess());
//     //     // expect(spy).toHaveBeenCalledWith(UserActions.loadAllSuccess({ users: initData.users }));
//     //     // expect(spy).toHaveBeenCalledWith(GroupActions.loadAllSuccess({ groups: initData.groups }));
//     //     done();
//     //   });
//     // });
//   });
// });

it('', () => {});
