import { Category } from '../models/category.interface';
import { UserRecommendation } from '../models/user-recommendation.interface';
import { ServiceOverviewVM } from '../view-models/service-overview-vm.interface';

/**
 * Данные для домашней директории
 */
export interface AdminHome {
  /**
   * Категории
   */
  categories: Category[];
  /**
   * Рекомендации для пользователя
   */
  user_recommendations: UserRecommendation[];
  /**
   * Список услуг
   */
  services: ServiceOverviewVM[];
}
