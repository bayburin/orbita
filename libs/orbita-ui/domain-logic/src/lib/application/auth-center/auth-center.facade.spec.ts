import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { HOST_FEATURE_KEY, State, initialState } from '../../infrastructure/store/host/host.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { AuthCenterFacade } from './auth-center.facade';
import { Host } from './../../entities/models/host.interface';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [HOST_FEATURE_KEY]: State;
  };
}

describe('AuthCenterFacade', () => {
  let facade: AuthCenterFacade;
  let store: MockStore<TestSchema>;
  const createHostEntity = (id: string, mac = '') =>
    (({
      id,
      mac: mac || `mac-${id}`,
    } as unknown) as Host);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [HOST_FEATURE_KEY]: initialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [AuthCenterFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(AuthCenterFacade);
    });

    it('', () => {
      /**  */
    });
  });
});
