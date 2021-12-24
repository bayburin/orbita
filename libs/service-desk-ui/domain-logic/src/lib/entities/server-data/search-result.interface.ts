import { Question } from '../models/question.interface';
import { Service } from '../models/service.interface';
import { Category } from '../models/category.interface';

/**
 * Результаты поиска
 */
export interface SearchResult {
  /**
   * Список категорий
   */
  categories: Category[];
  /**
   * Список услуг
   */
  services: Service[];
  /**
   * Список вопросов
   */
  questions: Question[];
}
