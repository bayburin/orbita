import { Category } from '../model/category.interface';
import { UserRecommendation } from '../model/user-recommendation.interface';
import { Service } from '../model/service.interface';

/**
 * Данные для домашней директории
 */
export interface Home {
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
