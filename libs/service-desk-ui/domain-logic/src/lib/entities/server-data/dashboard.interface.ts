import { Category } from '../model/category.interface';
import { UserRecommendation } from '../model/user-recommendation.interface';
import { Service } from '../model/service.interface';

/**
 * Данные для дашбоарда
 */
export interface Dashboard {
  /**
   * Категории
   */
  categories: Category[];
  /**
   * Рекомендации для пользователя
   */
  user_recommendations: UserRecommendation[];
  /**
   * Список популярных услуг
   */
  services: Service[];
}
