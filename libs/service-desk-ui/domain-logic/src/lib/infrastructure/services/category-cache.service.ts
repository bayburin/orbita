import { schema, normalize } from 'normalizr';

import { Category } from './../../entities/model/category.interface';
import { NormalizedCategories } from './../../entities/normalized-data.interface';

export const serviceSchema = new schema.Entity('services');

export const categorySchema = new schema.Entity('categories', {
  services: [serviceSchema],
});

export const categoriesSchema = new schema.Array(categorySchema);

/**
 * Сервис для нормализации данных по категориям
 */
export class CategoryCacheService {
  static normalizeategories(categories: Category | Category[]): NormalizedCategories {
    return Array.isArray(categories) ? normalize(categories, categoriesSchema) : normalize(categories, categorySchema);
  }
}
