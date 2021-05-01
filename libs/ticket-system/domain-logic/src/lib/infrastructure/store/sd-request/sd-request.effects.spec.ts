import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from '@nrwl/angular/testing';

import { SdRequestEffects } from './sd-request.effects';
import * as SdRequestActions from './sd-request.actions';
import { SdRequestApi } from './../../api/sd-request/sd-request.api';
import { SdRequestApiStub } from './../../api/sd-request/sd-request.api.stub';

describe('SdRequestEffects', () => {
  let actions$: Observable<Action>;
  let effects: SdRequestEffects;
  let sdRequestApi: SdRequestApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SdRequestEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: SdRequestApi, useClass: SdRequestApiStub }
      ],
    });

    effects = TestBed.inject(SdRequestEffects);
    sdRequestApi = TestBed.inject(SdRequestApi);
  });

  describe('loadAll$', () => {
    it('should call loadAllSuccess action if sdRequestApi finished successfully', () => {
      spyOn(sdRequestApi, 'getSdRequests').and.returnValue(cold('--a|', { a: [] }));
      actions$ = hot('-a-|', { a: SdRequestActions.loadAll() });
      const expected = hot('---a|', { a: SdRequestActions.loadAllSuccess({ sdRequests: [] }) });

      expect(effects.loadAll$).toBeObservable(expected);
    });

    it('should call loadAllFailure action if sdRequestApi finished failure', () => {
      const error = 'error message';
      spyOn(sdRequestApi, 'getSdRequests').and.returnValue(cold('--#', null, error));
      actions$ = hot('-a-|', { a: SdRequestActions.loadAll() });
      const expected = hot('---(a|)', { a: SdRequestActions.loadAllFailure({ error }) });

      expect(effects.loadAll$).toBeObservable(expected);
    });
  });
});
