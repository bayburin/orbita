import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as KaseActions from './kase.actions';
import { KaseEffects } from './kase.effects';

describe('KaseEffects', () => {
  let actions: Observable<Action>;
  let effects: KaseEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [KaseEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(KaseEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: KaseActions.init() });
      // const expected = hot('-a-|', { a: KaseActions.loadKaseSuccess({ kase: [] }) });
      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
