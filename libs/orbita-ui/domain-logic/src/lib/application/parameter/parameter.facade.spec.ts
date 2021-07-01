import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { PARAMETER_FEATURE_KEY, State, initialState } from '../../infrastructure/store/parameter/parameter.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { ParameterFacade } from './parameter.facade';
import { Parameter } from './../../entities/models/parameter.interface';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [PARAMETER_FEATURE_KEY]: State;
  };
}

describe('ParameterFacade', () => {
  let facade: ParameterFacade;
  let store: MockStore<TestSchema>;
  const createParameterEntity = (id: string, mac = '') =>
    (({
      id,
      mac: mac || `mac-${id}`,
    } as unknown) as Parameter);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [PARAMETER_FEATURE_KEY]: initialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ParameterFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(ParameterFacade);
    });

    it('', () => {
      /**  */
    });
  });
});
