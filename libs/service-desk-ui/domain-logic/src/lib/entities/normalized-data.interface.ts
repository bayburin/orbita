import { Dictionary } from '@ngrx/entity';
import { Category } from './model/category.interface';
import { Service } from './model/service.interface';
import { Question } from './model/question.interface';

/**
 * Нормализованные данные категории
 */
export interface NormalizedCategoriesEntities {
  categories: Dictionary<Category>;
  services: Dictionary<Service>;
}

/**
 * Нормализованные данные списка категорий, возвращаемый функцией normalize
 */
export interface NormalizedCategories {
  entities: NormalizedCategoriesEntities;
  result: number[] | number;
}

/**
 * Нормализованные данные услуг
 */
export interface NormalizedServicesEntities {
  services: Dictionary<Service>;
  questions: Dictionary<Question>;
}

/**
 * Нормализованные данные списка услуг, возвращаемый функцией normalize
 */
export interface NormalizedServices {
  entities: NormalizedServicesEntities;
  result: number[] | number;
}
