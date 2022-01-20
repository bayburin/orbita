import { of } from 'rxjs';

import { AdminUserRecommendationApiAbstract } from './admin-user-recommendation.api.abstract';

export class AdminUserRecommendationApiStub implements AdminUserRecommendationApiAbstract {
  api = '';

  query() {
    return of([]);
  }

  show() {
    return of(null);
  }

  save() {
    return of(null);
  }

  update() {
    return of(null);
  }

  destroy() {
    return of(null);
  }

  reorder() {
    return of(null);
  }
}
