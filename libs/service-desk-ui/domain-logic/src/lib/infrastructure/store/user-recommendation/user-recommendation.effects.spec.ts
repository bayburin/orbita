import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UserRecommendationActions from './user-recommendation.actions';
import { UserRecommendationEffects } from './user-recommendation.effects';

describe('UserRecommendationEffects', () => {
  let actions: Observable<Action>;
  let effects: UserRecommendationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [UserRecommendationEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(UserRecommendationEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UserRecommendationActions.init() });

      const expected = hot('-a-|', {
        a: UserRecommendationActions.loadUserRecommendationSuccess({ userRecommendation: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
