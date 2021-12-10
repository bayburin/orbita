import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as HomeActions from './home.actions';
import { HomeEffects } from './home.effects';
import { HomeApi } from '../../api/home/home.api';
import { HomeApiStub } from '../../api/home/home.api.stub';

describe('HomeEffects', () => {
  let actions: Observable<Action>;
  let effects: HomeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HomeEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: HomeApi, useClass: HomeApiStub },
      ],
    });

    effects = TestBed.inject(HomeEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: HomeActions.init() });
      // const expected = hot('-a-|', { a: HomeActions.loadHomeSuccess({ dashboard: [] }) });
      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
