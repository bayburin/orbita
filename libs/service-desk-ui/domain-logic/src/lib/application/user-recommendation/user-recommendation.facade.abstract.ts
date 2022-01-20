import { Observable } from 'rxjs';

import { UserRecommendation } from '../../entities/models/user-recommendation.interface';

export abstract class UserRecommendationFacadeAbstract {
  /**
   * Список всех рекомендаций
   */
  all$: Observable<UserRecommendation[]>;
}
