import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from '@nrwl/angular/testing';

import { FreeSdRequestTypeEffects } from './free-sd-request-type.effects';
import * as FreeSdRequestTypeActions from './free-sd-request-type.actions';
import { ServiceDeskApi } from '../../api/service-desk/service-desk.api';
import { ServiceDeskApiStub } from './../../api/service-desk/service-desk.api.stub';

describe('FreeSdRequestTypeEffects', () => {
  let actions$: Observable<Action>;
  let effects: FreeSdRequestTypeEffects;
  let serviceDeskApi: ServiceDeskApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FreeSdRequestTypeEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ServiceDeskApi, useClass: ServiceDeskApiStub }
      ],
    });

    effects = TestBed.inject(FreeSdRequestTypeEffects);
    serviceDeskApi = TestBed.inject(ServiceDeskApi);
  });

  describe('loadAll$', () => {
    it('should call loadAllSuccess action if serviceDeskApi finished successfully', () => {
      spyOn(serviceDeskApi, 'getFreeSdRequestTypes').and.returnValue(cold('--a|', { a: [] }));
      actions$ = hot('-a-|', { a: FreeSdRequestTypeActions.loadAll() });
      const expected = hot('---a|', { a: FreeSdRequestTypeActions.loadAllSuccess({ freeSdRequestTypes: [] }) });

      expect(effects.loadAll$).toBeObservable(expected);
    });

    it('should call loadAllFailure action if serviceDeskApi finished failure', () => {
      const error = 'error message';
      spyOn(serviceDeskApi, 'getFreeSdRequestTypes').and.returnValue(cold('--#', null, error));
      actions$ = hot('-a-|', { a: FreeSdRequestTypeActions.loadAll() });
      const expected = hot('---(a|)', { a: FreeSdRequestTypeActions.loadAllFailure({ error }) });

      expect(effects.loadAll$).toBeObservable(expected);
    });
  });
});
