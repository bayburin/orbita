import { BehaviorSubject } from 'rxjs';

import { UserRecommendationFacadeAbstract } from './user-recommendation.facade.abstract';

export class UserRecommendationFacadeStub implements UserRecommendationFacadeAbstract {
  all$ = new BehaviorSubject([]);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);

  loadAll() {
    /** */
  }
}
