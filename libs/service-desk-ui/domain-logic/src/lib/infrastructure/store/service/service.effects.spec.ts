import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ServiceActions from './service.actions';
import { ServiceEffects } from './service.effects';
import { ServiceApi } from '../../api/service/service.api';
import { ServiceApiStub } from './../../api/service/service.api.stub';

describe('ServiceEffects', () => {
  let actions: Observable<Action>;
  let effects: ServiceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ServiceEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: ServiceApi, useClass: ServiceApiStub },
      ],
    });

    effects = TestBed.inject(ServiceEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: ServiceActions.init() });
      // const expected = hot('-a-|', { a: ServiceActions.loadServiceSuccess({ service: [] }) });
      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
