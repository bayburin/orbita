import { Observable } from 'rxjs';

import { UserRecommendation } from './../../entities/model/user-recommendation.interface';

export abstract class UserRecommendationFacadeAbstract {
  /**
   * Общее число рекомендаций
   */
  all$: Observable<UserRecommendation[]>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Загружает список рекомендаций
   */
  abstract loadAll(): void;
}
