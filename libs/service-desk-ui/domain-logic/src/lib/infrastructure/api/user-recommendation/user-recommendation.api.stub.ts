import { of } from 'rxjs';

import { UserRecommendationApiAbstract } from './user-recommendation.api.abstract';

export class UserRecommendationApiStub implements UserRecommendationApiAbstract {
  api = '';

  query() {
    return of([]);
  }
}
