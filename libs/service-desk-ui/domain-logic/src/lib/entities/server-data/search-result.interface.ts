import { Question } from './../model/question.interface';
import { Service } from './../model/service.interface';
import { Category } from './../model/category.interface';

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
