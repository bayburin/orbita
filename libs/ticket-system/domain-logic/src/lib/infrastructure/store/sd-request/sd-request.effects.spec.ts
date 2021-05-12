import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from '@nrwl/angular/testing';

import { SdRequestEffects } from './sd-request.effects';
import * as SdRequestActions from './sd-request.actions';
import { SdRequestApi } from './../../api/sd-request/sd-request.api';
import { SdRequestApiStub } from './../../api/sd-request/sd-request.api.stub';
import { SD_REQUEST_FEATURE_KEY, initialState, State } from './sd-request.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../index';
import { SdRequestQueueBuilder } from './../../builders/sd-request-queue.builder';

describe('SdRequestEffects', () => {
  let actions$: Observable<Action>;
  let effects: SdRequestEffects;
  let sdRequestApi: SdRequestApi;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [SD_REQUEST_FEATURE_KEY]: initialState
    }
  }
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SdRequestEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: state }),
        { provide: SdRequestApi, useClass: SdRequestApiStub }
      ],
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(SdRequestEffects);
    sdRequestApi = TestBed.inject(SdRequestApi);
  });

  // describe('loadAll$', () => {
  //   it('should call loadAll action', done => {
  //     const sdRequestQueue = new SdRequestQueueBuilder().build();
  //     actions$ = of(SdRequestActions.SetPage);
  //     const spy = spyOn(store, 'dispatch');
  //     spyOn(sdRequestApi, 'query').and.returnValue(of(sdRequestQueue));

  //     effects.loadAll$.subscribe(() => {
  //       expect(spy).toHaveBeenCalledWith(SdRequestActions.loadAll());
  //       done();
  //     });
  //   });

  //   it('should call loadAllSuccess action if sdRequestApi finished successfully', () => {
  //     const sdRequestQueue = new SdRequestQueueBuilder().build();
  //     spyOn(sdRequestApi, 'query').and.returnValue(cold('--a|', { a: sdRequestQueue }));
  //     actions$ = hot('-a-|', { a: SdRequestActions.SetPage({ page: 2 }) });
  //     const expected = hot('---a|', { a: SdRequestActions.loadAllSuccess({ sdRequestQueue }) });

  //     expect(effects.loadAll$).toBeObservable(expected);
  //   });

  //   it('should call loadAllFailure action if sdRequestApi finished failure', () => {
  //     const error = 'error message';
  //     spyOn(sdRequestApi, 'query').and.returnValue(cold('--#', null, error));
  //     actions$ = hot('-a-|', { a: SdRequestActions.SetPage({ page: 2 }) });
  //     const expected = hot('---(a|)', { a: SdRequestActions.loadAllFailure({ error }) });

  //     expect(effects.loadAll$).toBeObservable(expected);
  //   });
  // });

  it('fake-test', () => {});
});
