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

  /**
   * Загружает рекомендацию для пользователя
   *
   * @param id - id записи
   */
  abstract show(id: number): Observable<UserRecommendation>;

  /**
   * Сохраняет запись
   *
   * @param formData - данные о записи.
   */
  abstract save(formData: UserRecommendation): Observable<UserRecommendation>;

  /**
   * Обновляет запись
   *
   * @param id - id записи
   * @param formData - новые данные
   */
  abstract update(id: number, formData: UserRecommendation): Observable<UserRecommendation>;

  /**
   * Удаляет запись
   *
   * @param id - id записи.
   */
  abstract destroy(id: number): Observable<UserRecommendation>;
}
