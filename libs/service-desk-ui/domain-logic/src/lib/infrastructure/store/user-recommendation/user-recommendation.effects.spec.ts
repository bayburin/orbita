import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UserRecommendationActions from './user-recommendation.actions';
import { UserRecommendationEffects } from './user-recommendation.effects';
import { UserRecommendationApi } from './../../api/user-recommendation/user-recommendation.api';
import { UserRecommendationApiStub } from './../../api/user-recommendation/user-recommendation.api.stub';

describe('UserRecommendationEffects', () => {
  let actions: Observable<Action>;
  let effects: UserRecommendationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UserRecommendationEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: UserRecommendationApi, useClass: UserRecommendationApiStub },
      ],
    });

    effects = TestBed.inject(UserRecommendationEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UserRecommendationActions.loadAll() });

      const expected = hot('-a-|', {
        a: UserRecommendationActions.loadAllSuccess({ recommendations: [] }),
      });

      expect(effects.loadAll$).toBeObservable(expected);
    });
  });
});
