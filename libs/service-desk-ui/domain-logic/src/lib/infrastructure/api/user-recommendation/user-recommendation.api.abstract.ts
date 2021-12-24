import { Observable } from 'rxjs';

import { UserRecommendation } from '../../../entities/models/user-recommendation.interface';

export abstract class UserRecommendationApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список рекомендаций
   */
  abstract query(): Observable<UserRecommendation[]>;
}
