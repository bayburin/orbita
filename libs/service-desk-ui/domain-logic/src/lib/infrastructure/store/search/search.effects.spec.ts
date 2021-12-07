import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as SearchActions from './search.actions';
import { SearchEffects } from './search.effects';
import { DashboardApi } from '../../api/dashboard/dashboard.api';
import { DashboardApiStub } from './../../api/dashboard/dashboard.api.stub';

describe('SearchEffects', () => {
  let actions: Observable<Action>;
  let effects: SearchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SearchEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: DashboardApi, useClass: DashboardApiStub },
      ],
    });

    effects = TestBed.inject(SearchEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: SearchActions.init() });
      // const expected = hot('-a-|', { a: SearchActions.loadSearchSuccess({ search: [] }) });
      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
