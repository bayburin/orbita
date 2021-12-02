import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as DashboardActions from './dashboard.actions';
import { DashboardEffects } from './dashboard.effects';

describe('DashboardEffects', () => {
  let actions: Observable<Action>;
  let effects: DashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [DashboardEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(DashboardEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: DashboardActions.init() });
      // const expected = hot('-a-|', { a: DashboardActions.loadDashboardSuccess({ dashboard: [] }) });
      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
