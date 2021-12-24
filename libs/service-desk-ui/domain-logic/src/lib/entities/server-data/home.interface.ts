import { Category } from '../models/category.interface';
import { UserRecommendation } from '../models/user-recommendation.interface';
import { Service } from '../models/service.interface';

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
