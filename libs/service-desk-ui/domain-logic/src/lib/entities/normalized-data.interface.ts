import { Dictionary } from '@ngrx/entity';
import { Category } from './model/category.interface';
import { Service } from './model/service.interface';

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
